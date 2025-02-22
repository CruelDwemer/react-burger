import * as React from 'react';
import {
	Logo,
	Button,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './styles.module.scss';
import HeaderButton from './components/header-button';

const AppHeader = () => {
	const [active, setActive] = useState(false);
	return (
		<header className={styles.header}>
			<div className={styles.buttonWrapper}>
				<HeaderButton
					text='Конструктор'
					icon={<BurgerIcon type='secondary' />}
					active
				/>
				<HeaderButton
					text='Лента заказов'
					icon={<ListIcon type='secondary' />}
				/>
			</div>
			<Logo className={styles.logo} />
			<div className={`${styles.buttonWrapper} ${styles.profileButtonWrapper}`}>
				<HeaderButton
					text='Личный кабинет'
					icon={<ProfileIcon type='secondary' />}
				/>
			</div>
		</header>
	);
};

export default AppHeader;
