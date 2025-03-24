import AuthContainer from '../../components/auth-container';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '@services/user-slice';
import { AnyAction } from '@reduxjs/toolkit';

const RegisterPage = () => {
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const submitForm = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await dispatch(registerUser(form) as unknown as AnyAction);
		if (result.payload?.success) {
			navigate('/login');
		}
	};

	return (
		<AuthContainer title='Регистрация'>
			<form className={styles.form} onSubmit={submitForm}>
				<Input
					type='text'
					placeholder='Имя'
					name='name'
					value={form.name}
					size='default'
					extraClass='mb-6'
					onChange={handleChange}
				/>
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
					extraClass={styles.button}>
					Зарегистрироваться
				</Button>
			</form>
			<p className={styles.text}>
				Уже зарегистрированы? <Link to='/login'>Войти</Link>
			</p>
		</AuthContainer>
	);
};

export default RegisterPage;
