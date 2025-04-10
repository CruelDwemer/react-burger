import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {logoutUser, modifyUser, setUser, UserState} from '@services/user-slice';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnyAction } from '@reduxjs/toolkit';
import { IStore, useAppDispatch, useAppSelector } from '@services/index';
import useForm from '../../hooks/useForm';

interface IProfileForm extends Record<string, string> {
	name: string;
	login: string;
	password: string;
}

const Profile = () => {
	const {
		values: form,
		handleChange: handleFormChange,
		setValues,
	} = useForm<IProfileForm>({
		name: '',
		login: '',
		password: '',
	});
	const [initialData, setInitialData] = useState({
		name: '',
		login: '',
		password: '',
	});
	const [formChanged, toggleFormChanged] = useState(false);
	const [ordersModal, setOrdersModal] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const userState: UserState = useAppSelector(
		(state) => state.user as UserState
	);

	const handleLogout = async () => {
		const result = await dispatch(logoutUser() as unknown as AnyAction);
		if (result.payload?.success) {
			navigate('/login');
		}
	};

	const changeUserInfo = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(modifyUser(form) as unknown as AnyAction);
		dispatch(setUser() as unknown as AnyAction);
		toggleFormChanged(false);
	};

	const cancelChange = () => {
		setValues({
			name: initialData.name,
			login: initialData.login,
			password: '',
		});
		toggleFormChanged(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		toggleFormChanged(true);
		handleFormChange(e);
	};

	function openOrders() {
		navigate('/profile/orders');
	}

	useEffect(() => {
		if (userState.isAuth) {
			setValues({
				name: userState.user?.name ?? '',
				login: userState.user?.email ?? '',
				password: '',
			});
			setInitialData({
				name: userState.user?.name ?? '',
				login: userState.user?.email ?? '',
				password: '',
			});
		}
	}, [setValues, userState]);

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
						<li className={styles.route}>Профиль</li>
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
				<form className={styles.inputs} onSubmit={changeUserInfo}>
					<Input
						type='text'
						placeholder='Имя'
						name='name'
						extraClass='mb-6'
						icon='EditIcon'
						value={form.name}
						onChange={handleChange}
					/>
					<Input
						type='text'
						placeholder='Логин'
						name='login'
						icon='EditIcon'
						extraClass='mb-6'
						value={form.login}
						onChange={handleChange}
					/>
					<Input
						type='password'
						placeholder='Пароль'
						name='password'
						icon='EditIcon'
						value={form.password}
						onChange={handleChange}
					/>
					{formChanged && (
						<div className={styles.buttons}>
							<Button
								htmlType='submit'
								type='primary'
								size='medium'
								extraClass='mt-15 mr-4'>
								Сохранить
							</Button>
							<Button
								htmlType='button'
								type='primary'
								size='medium'
								onClick={cancelChange}
								extraClass='mt-15 ml-4'>
								Отменить
							</Button>
						</div>
					)}
				</form>
			</div>
		</main>
	);
};

export default Profile;
