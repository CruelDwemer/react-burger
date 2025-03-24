import * as React from 'react';
import AuthContainer from '../../components/auth-container';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, setUser } from '@services/user-slice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AnyAction } from '@reduxjs/toolkit';

interface LoginForm {
	email: string;
	password: string;
}

const LoginPage = () => {
	const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const submitForm = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await dispatch(loginUser(form) as unknown as AnyAction);
		if (result.payload?.success) {
			const userSet = await dispatch(setUser() as unknown as AnyAction);
			if (userSet.payload?.success) {
				navigate(from, { replace: true });
			}
		} else {
			console.log('Error: ', result);
		}
	};

	return (
		<AuthContainer title='Вход'>
			<form className={styles.form} onSubmit={submitForm}>
				<EmailInput
					name='email'
					value={form.email}
					placeholder='E-mail'
					extraClass='mb-6'
					onChange={handleChange}
				/>
				<PasswordInput
					name='password'
					value={form.password}
					placeholder='Пароль'
					extraClass='mb-6'
					onChange={handleChange}
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass='mb-20'>
					Войти
				</Button>
			</form>
			<p className={styles.text}>
				Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
			</p>
			<p className={styles.text}>
				Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
			</p>
		</AuthContainer>
	);
};

export default LoginPage;
