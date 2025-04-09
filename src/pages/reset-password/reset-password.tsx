import styles from './styles.module.scss';
import * as React from 'react';
import AuthContainer from '../../components/auth-container';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
	PasswordInput,
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { setNewPassword } from '../../api/user';
import { useEffect } from 'react';
import useForm from '../../hooks/useForm';

interface IResetPasswordForm {
	password: string;
	token: string;
}

const ResetPassword = () => {
	const { values: form, handleChange } = useForm<IResetPasswordForm>({
		password: '',
		token: '',
	});
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from || '/';

	const submitForm = async (e: React.FormEvent) => {
		e.preventDefault();
		const result: { success: boolean } = (await setNewPassword(
			form
		)) as unknown as { success: boolean };
		if (result.success) {
			navigate('/login');
		}
	};

	useEffect(() => {
		if (from !== '/forgot-password') {
			navigate('/login');
		}
	}, [from, navigate]);

	return (
		<AuthContainer title='Восстановление пароля'>
			<form className={styles.form} onSubmit={submitForm}>
				<PasswordInput
					name='password'
					value={form.password}
					placeholder='Введите новый пароль'
					extraClass='mb-6'
					onChange={handleChange}
				/>
				<Input
					name='token'
					value={form.token}
					type='text'
					placeholder='Введите код из письма'
					extraClass='mb-6'
					onChange={handleChange}
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass={styles.button}>
					Восстановить
				</Button>
			</form>
			<p className={styles.text}>
				Вспомнили пароль? <Link to='/login'>Войти</Link>
			</p>
		</AuthContainer>
	);
};

export default ResetPassword;
