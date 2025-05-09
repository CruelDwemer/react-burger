import * as React from 'react';
import styles from './styles.module.scss';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from './components/burger-constructor-item';
import OrderDetails from './components/order-details';
import Modal from '../modal';
import { SyntheticEvent, useCallback, useState } from 'react';
import { useDrop } from "react-dnd";
import { addIngredient, sendOrderInfo, flushState } from '@services/index';
import { setUser } from '@services/user-slice';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@services/index';
import Bun, { ElementPlaceHolder } from './components/bun';
import { IIngredientData } from '../../types';
import { IngredientWithKey } from '@services/burger-constructor-slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { IUserInfoResponse } from '../../api/types';

interface IDragObject {
	dataId: string;
}

const BurgerConstructor = (): React.JSX.Element => {
	const { ingredients } = useAppSelector(state => state.ingredients)
	const {
		burgerList,
		bun
	} = useAppSelector(state => state.burger)
	const { orderInfo } = useAppSelector(state => state.order);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [ , dropTarget ] = useDrop<IDragObject, unknown, unknown>({
		accept: "ingredient",
		drop(item) {
			const itemToStore = ingredients.find((element: IIngredientData) => element._id === item.dataId);
			if (itemToStore) {
				dispatch(addIngredient(itemToStore));
			}
		},
	});

	const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);
	const showOrderModal = setOpenOrderModal.bind(null, true);
	const hideOrderModal = setOpenOrderModal.bind(null, false);

	const totalCost: number = burgerList.reduce((acc: number, item: IngredientWithKey) => (
		acc + item.price
	), bun?.price ? bun.price * 2 : 0);

	const createOrder = useCallback(async (e: SyntheticEvent): Promise<void> => {
		e.stopPropagation();
		const user = await dispatch(
			setUser()
		) as PayloadAction<IUserInfoResponse>;
		if(!user?.payload?.success) {
			navigate('/login');
			return
		}
		showOrderModal();
		dispatch(sendOrderInfo({
			ingredients: [bun?._id, ...burgerList.map(({ _id }: IngredientWithKey) => _id), bun?._id].filter(el => el) as string[]
		}))
	}, [bun, burgerList]);

	const closeOrderModal = (): void => {
		hideOrderModal();
		dispatch(flushState())
	}

	const orderId: number | undefined = orderInfo?.number;

	return (
		<section className={styles.container} ref={dropTarget}>
			{
				openOrderModal &&
				<Modal closeModal={closeOrderModal}>
					<OrderDetails orderId={orderId} />
				</Modal>
			}
			<div className={styles.top}>
				<Bun bun={bun} type='top' />
			</div>
			<ul className={styles.items}>
				{burgerList.length ?
					burgerList.map((item: IngredientWithKey, index: number) => (
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

export default BurgerConstructor;
