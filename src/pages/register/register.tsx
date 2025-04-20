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
import { registerUser } from '@services/user-slice';
import { AnyAction } from '@reduxjs/toolkit';
import useForm from '../../hooks/useForm';
import { useAppDispatch } from '@services/index';

interface IRegisterForm {
	name: string;
	email: string;
	password: string;
}

const RegisterPage = (): React.JSX.Element => {
	const { values: form, handleChange } = useForm<IRegisterForm>({
		name: '',
		email: '',
		password: '',
	});
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const submitForm = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
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
