import * as React from 'react';
import styles from './styles.module.scss';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DataInterface } from '../../../../types';
import { useDrag } from 'react-dnd';

interface Props extends DataInterface {
	onClick: () => void;
}

const Ingredient = ({ name, image, price, onClick, _id }: Props) => {
	const [{ isDrag }, dragRef] = useDrag({
		type: 'ingredient',
		item: { dataId: _id },
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
	});

	// console.log('isDrag', isDrag)

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className={styles.ingredient} onClick={onClick}>
			<Counter count={1} size='default' extraClass={styles.counter} />

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
