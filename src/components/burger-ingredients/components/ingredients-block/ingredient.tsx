import * as React from 'react';
import styles from './styles.module.scss';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DataInterface } from '../../types';

interface Props extends DataInterface {
	onClick: () => void;
}

const Ingredient = ({ name, image, price, onClick }: Props) => (
	// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
	<div className={styles.ingredient} onClick={onClick}>
		<Counter count={1} size='default' extraClass={styles.counter} />

		<img src={image} alt={name} className={styles.image} />
		<div className={styles.priceData}>
			<p className={styles.text}>{price}</p>
			<CurrencyIcon type='primary' />
		</div>
		<h2 className={styles.subheader}>{name}</h2>
	</div>
);

export default Ingredient;
