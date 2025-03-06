import * as React from 'react';
import styles from './styles.module.scss';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DataInterface } from '../../../../types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { Store } from '@services/index';
import { INGREDIENT_TYPE } from '../../types';

interface Props extends DataInterface {
	onClick: () => void;
}

const Ingredient = ({ name, image, price, onClick, _id, type }: Props) => {
	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { dataId: _id },
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
	});
	let count = 0;
	const { burgerList, bun } = useSelector((store: Store) =>
		store.burger
	);
	if (type === INGREDIENT_TYPE.BUN) {
		if (bun?._id === _id) {
			count = 1;
		}
	} else {
		count = burgerList.filter(({ _id: id }) => id === _id).length;
	}

	// console.log('burgerList', burgerList);
	// console.log('bun', bun);
	// console.log('count', count);

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className={styles.ingredient} onClick={onClick}>
			{!!count && (
				<Counter count={count} size='default' extraClass={styles.counter} />
			)}

			<img src={image} alt={name} className={styles.image} ref={dragRef} />
			<div className={styles.priceData}>
				<p className={styles.text}>{price}</p>
				<CurrencyIcon type='primary' />
			</div>
			<h2 className={styles.subheader}>{name}</h2>
		</div>
	);
};

export default Ingredient;
