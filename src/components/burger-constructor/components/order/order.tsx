import * as React from 'react';
import styles from './styles.module.scss';
import orderDoneImage from '../../../../images/order-done.svg';

interface Props {
	orderId: string;
}

const Order = ({ orderId }: Props) => (
	<div className={styles.container}>
		<p className={styles.orderId}>{orderId}</p>
		<p className={styles.idText}>идентификатор заказа</p>
		<img
			className={styles.image}
			src={orderDoneImage}
			alt='Иконка завершения заказа'
		/>
		<p className={styles.textCooking}>Ваш заказ начали готовить</p>
		<p className={styles.textWait}>
			Дождитесь готовности на орбитальной станции
		</p>
	</div>
);

export default Order;
