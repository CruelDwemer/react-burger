import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import FeedOrder from '../../components/feed-order/feed-order';
import type {
	IFeedUpdatedOrder,
	IOrdersData,
	ISocketOrdersData,
} from '../../types';
import { setOrders, getUpdatedOrders, clearOrders } from '@services/feed-slice';
import { useAppDispatch, useAppSelector } from '@services/index';
import { SOCKET_URL } from '@utils/constants';
import { wsConnect, wsDisconnect } from '@services/actions/websocket-actions';
import { getStatus, getOrders, wsClearOrders } from '@services/websocket-slice';
import { updateOrdersData } from '@utils/feedUtils';

const Feed = (): React.JSX.Element => {
	const [ordersData, setOrdersData] = useState<IOrdersData>();
	const [statuses, setStatuses] = useState<number>(0);

	const { ingredients } = useAppSelector((state) => state.ingredients);
	const socketStatus = useAppSelector(getStatus);
	const socketOrders = useAppSelector(getOrders);
	const updatedOrdersData = useAppSelector(getUpdatedOrders);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(wsConnect(`${SOCKET_URL}/all`));
		return () => {
			dispatch(clearOrders());
			dispatch(wsClearOrders());
			dispatch(wsDisconnect());
		};
	}, [dispatch]);

	useEffect(() => {
		setStatuses((prevState) => ++prevState);
	}, [socketStatus]);

	useEffect(() => {
		if (
			socketOrders &&
			(socketOrders as ISocketOrdersData).success &&
			statuses > 0
		) {
			const orders = socketOrders as ISocketOrdersData;
			const updatedData = updateOrdersData(orders, ingredients);
			dispatch(setOrders(updatedData));
		}
	}, [socketOrders]);

	useEffect(() => {
		if (updatedOrdersData) {
			setOrdersData(updatedOrdersData as IOrdersData);
		}
	}, [updatedOrdersData]);

	return (
		<div>
			<h1 className={styles.title}>Лента заказов</h1>
			<div className={styles.container}>
				<section className={styles.columnLeft}>
					<div className={styles.ordersFeed}>
						{ordersData?.orders.map((order: IFeedUpdatedOrder) => (
							<FeedOrder key={order.uniqueId} order={order} page='feed' />
						))}
					</div>
				</section>
				<section className={styles.columnRight}>
					<div className={styles.orderStatus}>
						<div className={styles.ready}>
							<h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
							<div className={styles.ordersReady}>
								{ordersData &&
									ordersData.ready.map((order: number, index: number) => (
										<p
											key={index}
											className='text text_type_digits-default mb-2'>
											{order}
										</p>
									))}
							</div>
						</div>
						<div className={styles.working}>
							<h2 className='text text_type_main-medium mb-6'>В работе:</h2>
							<div className={styles.ordersWorking}>
								{ordersData &&
									ordersData.working.map((order: number, index: number) => (
										<p
											key={index}
											className='text text_type_digits-default mb-2'>
											{order}
										</p>
									))}
							</div>
						</div>
					</div>
					<div>
						<p className='text text_type_main-medium mt-15'>
							Выполнено за все время:
						</p>
						{<p className={styles.digits}>{ordersData?.total}</p>}
					</div>
					<div>
						<p className='text text_type_main-medium mt-15'>
							Выполнено за сегодня:
						</p>
						{<p className={styles.digits}>{ordersData?.totalToday}</p>}
					</div>
				</section>
			</div>
		</div>
	);
};

export default Feed;
