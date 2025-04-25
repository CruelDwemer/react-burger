import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '@services/index';
import { getUpdatedOrders } from '@services/feed-slice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import type {
	ICountedIngredient,
	IFeedUpdatedOrder,
	IIngredientWithUUID,
	IOrdersData,
} from '../../types';
import { wsConnect, wsDisconnect } from '@services/actions/websocket-actions';
import {
	getOrders,
	getStatus,
	WebsocketStatus,
} from '@services/websocket-slice';
import { updateOrdersData } from '@utils/feedUtils';
import { SOCKET_URL } from '@utils/constants';
import { getWebsocketToken } from '@utils/cookies';

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
	const updatedOrdersData = useAppSelector(
		getUpdatedOrders as unknown as () => IOrdersData | null
	);

	const socketStatus = useAppSelector(getStatus);
	const socketOrders = useAppSelector(getOrders);
	const ingredientsList = useAppSelector(
		(state: RootState) => state.ingredients.ingredients
	);

	const compare = (
		element: IIngredientWithUUID,
		list: Array<ICountedIngredient>
	): { includes: boolean; id: number } => {
		let includes = false;
		let id = 0;
		list.forEach((item, index) => {
			if (item._id === element._id) {
				includes = true;
				id = index;
			}
		});
		return { includes, id };
	};

	const sortIngredients = useCallback(() => {
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
	}, [order?.updatedIngredients]);

	const getTotalPrice = (ingredients: Array<ICountedIngredient>) => {
		const result = ingredients.reduce((acc, item) => {
			return acc + item.price * item.count;
		}, 0);
		setTotalPrice(result);
	};

	useEffect(() => {
		if (socketOrders && socketOrders.success && ingredientsList.length > 0) {
			const updatedData = updateOrdersData(socketOrders, ingredientsList);
			const order = updatedData.orders.find(
				(item) => item.number === Number(params.id)
			);
			setOrder(order as IFeedUpdatedOrder);
			if (order) {
				setStatus(order.status);
			}
		}
	}, [socketOrders, ingredientsList, params.id]);

	useEffect(() => {
		const handleState = async (data: IOrdersData | null) => {
			if (location.state?.background && data !== null) {
				const order = data.orders.find(
					(item) => item.number === Number(params.id)
				);
				setOrder(order);
				if (order) {
					setStatus(order.status);
				}
			} else if (!location.state) {
				if (location.pathname.includes('/profile/orders/')) {
					const accessToken = await getWebsocketToken();
					dispatch(wsConnect(`${SOCKET_URL}?token=${accessToken}`));
				}
				dispatch(wsConnect(`${SOCKET_URL}/all`));
			}
		};
		handleState(updatedOrdersData);
		return () => {
			if (socketStatus === WebsocketStatus.ONLINE) {
				dispatch(wsDisconnect());
			}
		};
	}, []);

	useEffect(() => {
		if (order) {
			sortIngredients();
		}
	}, [order, sortIngredients]);

	useEffect(() => {
		if (countedIngredients.length > 0) {
			getTotalPrice(countedIngredients);
		}
	}, [countedIngredients]);

	return (
		<div className={styles.main}>
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
					{countedIngredients.map((ingredient) => (
						<Ingredient
							key={ingredient._id}
							image={ingredient.image}
							name={ingredient.name}
							count={ingredient.count}
							price={ingredient.price}
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
