import styles from './styles.module.scss';
import AuthContainer from '../../components/auth-container';
import { Link, useNavigate } from 'react-router-dom';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import * as React from 'react';
import { resetPassword } from '../../api/user';
import useForm from '../../hooks/useForm';

interface IForgotPasswordForm {
	email: string;
}

const ForgotPassword = () => {
	const { values: form, handleChange } = useForm<IForgotPasswordForm>({ email: '' });
	const navigate = useNavigate();

	const submitForm = async (e: React.FormEvent) => {
		e.preventDefault();
		const result: { success: boolean } = await resetPassword(form);
		if (result.success) {
			navigate('/reset-password', { state: { from: '/forgot-password' } });
		}
	};

	return (
		<AuthContainer title='Восстановление пароля'>
			<form className={styles.form} onSubmit={submitForm}>
				<EmailInput
					name='email'
					placeholder='Укажите e-mail'
					extraClass='mb-6'
					onChange={handleChange}
					value={form.email}
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

export default ForgotPassword;
