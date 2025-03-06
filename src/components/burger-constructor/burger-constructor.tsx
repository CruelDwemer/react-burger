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
import { useSelector, useDispatch } from 'react-redux';
// import { Store, addIngredient } from '@services/index';
import { DataInterface } from '../../types';
import { useDrop } from "react-dnd";
import { addIngredient, Store } from '../../services/index';
import classnames from '@utils/classnames';

const BurgerConstructor = () => {
	const { ingredients } = useSelector((state: Store) => state.ingredients);
	const {
		burgerList,
		bun,
		bunSelected
	} = useSelector((state: Store) => state.burger);

	const dispatch = useDispatch();

	const [ , dropTarget ] = useDrop({
		accept: "ingredient",
		drop(item: any) {
			const itemToStore = ingredients.find(element => element._id === item.dataId)
			dispatch(addIngredient(itemToStore));
		},
	});

	// let bun: DataInterface | null = ingredients[0];
	// const constructorData = ingredients.filter((el) => el.type !== TAB.BUN).slice(0, 6);

	// bun = null;
	// const burgerListIds = burgerList.map(({ _id }) => _id);
	// let constructorData: DataInterface[] = ingredients.filter(item => burgerListIds.includes(item._id));

	const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);
	const showOrderModal = setOpenOrderModal.bind(null, true);
	const hideOrderModal = setOpenOrderModal.bind(null, false);

	return (
		<section className={styles.container} ref={dropTarget}>
			{
				openOrderModal &&
				<Modal closeModal={hideOrderModal}>
					<OrderDetails orderId={'034536'} />
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
