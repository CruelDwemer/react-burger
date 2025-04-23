import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@services/index';
import { getUpdatedOrders } from '@services/feed-slice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import type {
	IFeedUpdatedOrder,
	IIngredientWithUUID,
	IFeedOrder,
	IOrdersData,
} from '../../types';
import { wsConnect, wsDisconnect } from '@services/actions';
import { getStatus, getOrders } from '@services/websocket-slice';
import { updateOrdersData } from '@services/helpers/feed';
import { SOCKET_URL } from '../../utils/constants';
import { AppStore, RootState } from '@services/types';

type TData = {
	success: boolean;
	orders: Array<IFeedOrder>;
	total: string;
	totalToday: string;
};

type State = {
	feed: {
		data: IOrdersData | null;
	};
};

interface ICountedIngredient extends IIngredientWithUUID {
	count: number;
}

const OrderInfo = (): React.JSX.Element => {
	const [order, setOrder] = useState<IFeedUpdatedOrder>();
	const [status, setStatus] = useState<string>('');
	const [countedIngredients, setCountedIngredients] = useState<
		Array<ICountedIngredient>
	>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	const params = useParams();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const updatedOrdersData = useAppSelector(getUpdatedOrders);

	const socketStatus = useAppSelector(getStatus);
	const socketOrders = useAppSelector(getOrders);
	const ingredientsList = useAppSelector(
		(state: AppStore) => state.ingredients.ingredients
	);

	function compare(
		element: IIngredientWithUUID,
		list: Array<ICountedIngredient>
	): { includes: boolean; id: number } {
		let includes = false;
		let id = 0;
		list.forEach((item, index) => {
			if (item._id === element._id) {
				includes = true;
				id = index;
			}
		});
		return { includes, id };
	}

	function sortIngredients() {
		const result: Array<ICountedIngredient> = [];
		order?.updatedIngredients.forEach((item) => {
			const compared = compare(item, result);
			if (compared.includes) {
				result[compared.id].count++;
			} else {
				result.push({ ...item, count: 1 });
			}
		});
		setCountedIngredients(result);
	}

	function getTotalPrice(ingredients: Array<ICountedIngredient>) {
		const result = ingredients.reduce((acc, item) => {
			return acc + item.price * item.count;
		}, 0);
		setTotalPrice(result);
	}

	useEffect(() => {
		if (
			socketOrders &&
			socketOrders.success === true &&
			ingredientsList.length > 0
		) {
			const updatedData = updateOrdersData(socketOrders, ingredientsList);
			const order = updatedData.orders.find(
				(item) => item.number === Number(params.id)
			);
			setOrder(order);
			if (order) {
				setStatus(order.status);
			}
		}
	}, [socketOrders, ingredientsList]);

	useEffect(() => {
		function handleState(data: IOrdersData | null) {
			if (location.state?.background && data !== null) {
				const order = data.orders.find(
					(item) => item.number === Number(params.id)
				);
				setOrder(order);
				if (order) {
					setStatus(order.status);
				}
			} else if (!location.state) {
				dispatch(wsConnect(`${SOCKET_URL}/all`));
			}
		}
		handleState(updatedOrdersData);
		return () => {
			if (socketStatus === 'ONLINE') {
				dispatch(wsDisconnect());
			}
		};
	}, [updatedOrdersData]);

	useEffect(() => {
		if (order) {
			sortIngredients();
		}
	}, [order]);

	useEffect(() => {
		if (countedIngredients.length > 0) {
			getTotalPrice(countedIngredients);
		}
	}, [countedIngredients]);

	return (
		<div
			className={styles.container}
			style={location.state?.background ? {} : { marginTop: '80px' }}>
			<p className={styles.orderId}>{`#${order?.number}`}</p>
			<p className='text text_type_main-medium mb-3'>{order?.name}</p>
			<p
				className='text text_type_main-small mb-15 '
				style={status === 'done' ? { color: 'rgba(0, 204, 204, 1)' } : {}}>
				{status === 'done'
					? 'Выполнен'
					: status === 'pending'
					? 'Готовится'
					: 'Создан'}
			</p>
			<p className='text text_type_main-medium mb-6'>Состав:</p>
			<div className={styles.ingredients}>
				{countedIngredients.map((ingedient) => (
					<Ingredient
						key={ingedient._id}
						image={ingedient.image}
						name={ingedient.name}
						count={ingedient.count}
						price={ingedient.price}
					/>
				))}
			</div>
			<div className={styles.footer}>
				<p className='text text_type_main-default text_color_inactive'>
					{order?.date}
				</p>
				<div className={styles.price}>
					<p className='text text_type_digits-default mr-2'>{totalPrice}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

const Ingredient = ({
	image,
	name,
	count,
	price,
}: {
	image: string;
	name: string;
	count: number;
	price: number;
}): React.JSX.Element => {
	return (
		<div className={styles.ingredient}>
			<div className={styles.left}>
				<div className={styles.imageContainer}>
					<img className={styles.image} src={image} alt='' />
				</div>
				<p className='text text_type_main-default'>{name}</p>
			</div>
			<div className={styles.price}>
				<p className='text text_type_digits-default mr-2'>{`${count} x ${price}`}</p>
				<CurrencyIcon type='primary' />
			</div>
		</div>
	);
};

export default OrderInfo;
