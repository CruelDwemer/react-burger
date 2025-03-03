import * as React from 'react';
import styles from './styles.module.scss';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface Props {
	index: number;
	text: string;
	price: number;
	thumbnail: string;
	length: number;
}

const BurgerConstructorItem = ({
	index,
	text,
	price,
	thumbnail,
	length,
}: Props) => {
	const isFinal = index === length - 1;
	return (
		<li className={styles.container}>
			<div className={styles.icon}>
				<DragIcon type='primary' />
			</div>
			<ConstructorElement
				text={text}
				price={price}
				thumbnail={thumbnail}
				key={index}
				extraClass={!isFinal ? 'mb-4' : ''}
			/>
		</li>
	);
};

export default BurgerConstructorItem;
