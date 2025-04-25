import * as React from 'react';
import styles from './styles.module.scss';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { IUserState, modifyUser, setUser } from '@services/user-slice';
import useForm from '../../hooks/useForm';
import { RootState, useAppDispatch, useAppSelector } from '@services/index';

interface IProfileForm extends Record<string, string> {
	name: string;
	login: string;
	password: string;
}

const ProfileForm = () => {
	const {
		values: form,
		handleChange: handleFormChange,
		setValues,
	} = useForm<IProfileForm>({
		name: '',
		login: '',
		password: '',
	});
	const [initialData, setInitialData] = useState<IProfileForm>({
		name: '',
		login: '',
		password: '',
	});
	const [formChanged, toggleFormChanged] = useState(false);

	const dispatch = useAppDispatch();
	const userState: IUserState = useAppSelector(
		(state: RootState) => state.user as IUserState
	);

	const changeUserInfo = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		dispatch(modifyUser(form));
		dispatch(setUser());
		toggleFormChanged(false);
	};

	const cancelChange = (): void => {
		setValues({
			name: initialData.name,
			login: initialData.login,
			password: '',
		});
		toggleFormChanged(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		toggleFormChanged(true);
		handleFormChange(e);
	};

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

	return (
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
	);
};

export default ProfileForm;
