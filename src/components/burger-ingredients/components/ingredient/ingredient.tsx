import * as React from 'react';
import styles from './style.module.scss';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface Props {
	_id: string;
	// dataId: string;
	name: string;
	image: string;
	price: number;
	showModal: () => void;
}

function Ingredient({ _id, name, image, price, showModal }: Props) {
	// const counter = <Counter count={1} size="default" extraClass={styles.counter} />

	return (
		<div
			className={styles.ingredient}
			// style={(id === 1 || id === 2) ? {marginTop: "24px"} : {}}
			// onClick={() => showModal(_id)}
		>
			<Counter count={1} size='default' extraClass={styles.counter} />

			<img src={image} alt={name} className={styles.image} />
			<div className={styles.priceData}>
				<p className={styles.text}>{price}</p>
				<CurrencyIcon type='primary' />
			</div>
			<h2 className={styles.subheader}>{name}</h2>
		</div>
	);
}

export default Ingredient;
