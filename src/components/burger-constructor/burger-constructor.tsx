import * as React from 'react';
import styles from './styles.module.scss';
import {
	ConstructorElement,
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TAB } from '../burger-ingredients/types';
import BurgerConstructorItem from './components/burger-constructor-item';
import OrderDetails from './components/order-details';
import Modal from '../modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '@services/index';

const BurgerConstructor = () => {
	const { ingredients } = useSelector((state: Store) => state.ingredients);
	const bun = ingredients[0];
	const constructorData = ingredients.filter((el) => el.type !== TAB.BUN).slice(0, 6);

	const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);
	const showOrderModal = setOpenOrderModal.bind(null, true);
	const hideOrderModal = setOpenOrderModal.bind(null, false);

	return (
		<section className={styles.container}>
			{
				openOrderModal &&
				<Modal closeModal={hideOrderModal}>
					<OrderDetails orderId={'034536'} />
				</Modal>
			}
			<div className={styles.top}>
				{bun && (
					<ConstructorElement
						text={`${bun.name}\n (верх)`}
						price={bun.price}
						thumbnail={bun.image_mobile}
						extraClass='mb-4'
						isLocked={true}
						type='top'
					/>
				)}
			</div>
			<ul className={styles.items}>
				{constructorData &&
					constructorData.map((item, index) => (
						<BurgerConstructorItem
							index={index}
							text={item.name}
							price={item.price}
							thumbnail={item.image_mobile}
							length={constructorData.length}
							key={item._id}
						/>
					))}
			</ul>
			<div className={styles.bottom}>
				{bun && (
					<ConstructorElement
						text={`${bun.name} \n (низ)`}
						price={bun.price}
						thumbnail={bun.image_mobile}
						isLocked={true}
						extraClass='mt-4'
						type='bottom'
					/>
				)}
			</div>
			<div className={styles.result}>
				<div className={styles.price}>
					<p className={styles.priceCount}>610</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					type='primary'
					size='large'
					htmlType='button'
					onClick={showOrderModal}
				>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

export default BurgerConstructor;
