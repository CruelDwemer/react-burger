import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { logoutUser } from '@services/user-slice';
import { useNavigate, useLocation } from 'react-router-dom';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '@services/index';
import ProfileForm from '../../components/profile-form';
import ProfileOrders from '../../components/profile-orders';
import { IResponseBase } from '../../api/types';

const Profile = (): React.JSX.Element => {
	const [ordersModal, setOrdersModal] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogout = async (): Promise<void> => {
		const result = (await dispatch(
			logoutUser()
		)) as PayloadAction<IResponseBase>;
		if (result.payload?.success) {
			navigate('/login');
		}
	};

	const openOrders = (): void => {
		navigate('/profile/orders');
	};

	useEffect(() => {
		if (location.pathname === '/profile/orders') {
			setOrdersModal(true);
		} else {
			setOrdersModal(false);
		}
	}, [location]);

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.list}>
					<ul className={styles.routes}>
						<li className={ordersModal ? styles.routeSecondary : styles.route}>
							Профиль
						</li>
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
						<li
							className={ordersModal ? styles.route : styles.routeSecondary}
							onClick={openOrders}>
							История заказов
						</li>
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
						<li className={styles.routeSecondary} onClick={handleLogout}>
							Выход
						</li>
					</ul>
					<p className={styles.text}>
						В этом разделе вы можете изменить свои персональные данные
					</p>
				</div>
				{!ordersModal ? <ProfileForm /> : <ProfileOrders />}
			</div>
		</main>
	);
};

export default Profile;
