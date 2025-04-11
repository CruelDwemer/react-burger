import * as React from 'react';
import AuthContainer from '../../components/auth-container';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import { loginUser, setUser } from '@services/user-slice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AnyAction } from '@reduxjs/toolkit';
import useForm from '../../hooks/useForm';
import { useAppDispatch } from '@services/index';

interface ILoginForm {
	email: string;
	password: string;
}

const LoginPage = (): React.JSX.Element => {
	const { values: form, handleChange } = useForm<ILoginForm>({
		email: '',
		password: '',
	});

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const submitForm = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
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
