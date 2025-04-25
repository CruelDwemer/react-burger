import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { useAppSelector, useAppDispatch, RootState } from '@services/index';
import { getToken } from '@utils/cookies';
import { wsConnect, wsDisconnect } from '@services/actions/websocket-actions';
import { getOrders, getStatus, wsClearOrders } from '@services/websocket-slice';
import { IFeedUpdatedOrder } from '../../types';
import { updateOrdersData } from '@utils/feedUtils';
import FeedOrder from '../../components/feed-order/feed-order';
import {
	setPersonalOrders,
	getPersonalOrders,
	clearPersonalOrders,
} from '@services/feed-slice';
import { SOCKET_URL } from '@utils/constants';

const ProfileOrders = () => {
	const [orders, setOrders] = useState<Array<IFeedUpdatedOrder>>([]);
	const [accessToken, setAccessToken] = useState<string | undefined>();
	const [status, setStatus] = useState<number>(0);

	const dispatch = useAppDispatch();
	const ingredientsList = useAppSelector(
		(state: RootState) => state.ingredients.ingredients
	);
	const ordersData = useAppSelector(getOrders);
	const personalOrders = useAppSelector(getPersonalOrders);
	const socketStatus = useAppSelector(getStatus);

	const getAccessToken = async () => {
		const token = await getToken();
		const tokenValue = token ? token.replace('Bearer ', '') : undefined;
		setAccessToken(tokenValue);
	};

	useEffect(() => {
		getAccessToken();
		return () => {
			dispatch(clearPersonalOrders());
			dispatch(wsClearOrders());
			dispatch(wsDisconnect());
		};
	}, [dispatch]);

	useEffect(() => {
		if (typeof accessToken === 'string') {
			dispatch(wsConnect(`${SOCKET_URL}?token=${accessToken}`));
		}
	}, [accessToken, dispatch]);

	useEffect(() => {
		if (
			ordersData &&
			ordersData.success &&
			ingredientsList.length > 0 &&
			status > 0
		) {
			const updatedData = updateOrdersData(ordersData, ingredientsList);
			dispatch(setPersonalOrders(updatedData));
		}
	}, [dispatch, ingredientsList, ordersData, status]);

	useEffect(() => {
		if (personalOrders) {
			setOrders(personalOrders.orders);
		}
	}, [personalOrders]);

	useEffect(() => {
		setStatus((prevState) => ++prevState);
	}, [socketStatus]);

	return (
		<div className={styles.ordersContainer}>
			<div className={styles.orders}>
				{orders &&
					orders.map((item) => (
						<FeedOrder order={item} key={item.uniqueId} page='profile/orders' />
					))}
			</div>
		</div>
	);
};

export default ProfileOrders;
