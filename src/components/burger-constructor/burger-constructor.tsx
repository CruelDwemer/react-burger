import * as React from 'react';
import styles from './styles.module.scss';
import {
	ConstructorElement,
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from './components/burger-constructor-item';
import OrderDetails from './components/order-details';
import Modal from '../modal';
import { SyntheticEvent, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataInterface } from '../../types';
import { useDrop } from "react-dnd";
import { addIngredient, Store } from '../../services/index';
import classnames from '@utils/classnames';
import { sendOrderInfo, flushState } from '../../services/index';
import { UnknownAction } from 'redux';

const BurgerConstructor = () => {
	const { ingredients } = useSelector((state: Store) => state.ingredients);
	const {
		burgerList,
		bun
	} = useSelector((state: Store) => state.burger);
	const { orderInfo } = useSelector((state: Store) => state.order)

	const dispatch = useDispatch();

	const [ , dropTarget ] = useDrop({
		accept: "ingredient",
		drop(item: any) {
			const itemToStore = ingredients.find(element => element._id === item.dataId);
			if (itemToStore) {
				dispatch(addIngredient(itemToStore));
			}
		},
	});

	const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);
	const showOrderModal = setOpenOrderModal.bind(null, true);
	const hideOrderModal = setOpenOrderModal.bind(null, false);

	const totalCost = burgerList.reduce((acc, item) => (
		acc + item.price
	), bun?.price ? bun.price * 2 : 0);

	const createOrder = useCallback((e: SyntheticEvent) => {
		e.stopPropagation();
		showOrderModal();
		dispatch(sendOrderInfo({
			ingredients: [bun?._id, ...burgerList.map(({ _id }) => _id), bun?._id].filter(el => el) as string[]
		}) as unknown as UnknownAction)
	}, [bun, burgerList]);

	const closeOrderModal = () => {
		hideOrderModal();
		dispatch(flushState())
	}

	const orderId = orderInfo?.order?.number;

	return (
		<section className={styles.container} ref={dropTarget}>
			{
				openOrderModal &&
				orderId &&
				<Modal closeModal={closeOrderModal}>
					<OrderDetails orderId={orderId} />
				</Modal>
			}
			<div className={styles.top}>
				<Bun bun={bun} type='top' />
			</div>
			<ul className={styles.items}>
				{burgerList.length ?
					burgerList.map((item, index) => (
						<BurgerConstructorItem
							index={index}
							text={item.name}
							price={item.price}
							thumbnail={item.image_mobile}
							key={item.key}
							dataKey={item.key}
							isLast={index === burgerList.length - 1}
						/>
					)) : <ElementPlaceHolder/>
				}
			</ul>
			<div className={styles.bottom}>
				<Bun bun={bun} type='bottom' />
			</div>
			<div className={styles.result}>
				<div className={styles.price}>
					<p className={styles.priceCount}>{totalCost}</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					type='primary'
					size='large'
					htmlType='button'
					onClick={createOrder}
				>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

interface BunProps {
	bun: DataInterface | null;
	type: 'bottom' | 'top';
}

const TopBunPlaceHolder = () => <div className={classnames(styles.constructorElement, styles.constructorElementPosTop)}>Добавьте булку</div>
const BottomBunPlaceHolder = () => <div className={classnames(styles.constructorElement, styles.constructorElementPosBottom)}>Добавьте булку</div>
const ElementPlaceHolder = () => <div className={styles.constructorElement}>Добавьте ингредиент</div>

const Bun = ({ bun, type }: BunProps) => {
	const [ , dropTarget ] = useDrop({
		accept: "inside",
		drop: item => ({ data: type })
	});

	if(!bun) {
		return type === 'top' ? <TopBunPlaceHolder/> : <BottomBunPlaceHolder/>
	}

	return (
		<div ref={dropTarget}>
			<ConstructorElement
				text={`${bun!.name} \n ${type === 'top' ? '(верх)' : '(низ)'}`}
				price={bun!.price}
				thumbnail={bun!.image_mobile}
				isLocked={true}
				extraClass='mt-4'
				type={type}
			/>
		</div>
	)
};

export default BurgerConstructor;
