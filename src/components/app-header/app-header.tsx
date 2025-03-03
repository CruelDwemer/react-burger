import * as React from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import HeaderButton from './components/header-button';
import classnames from '@utils/classnames';

const AppHeader = () => (
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
				buttonClassName={styles.rightButton}
			/>
		</div>
		<Logo className={styles.logo} />
		<div
			className={classnames(styles.buttonWrapper, styles.profileButtonWrapper)}>
			<HeaderButton
				text='Личный кабинет'
				icon={<ProfileIcon type='secondary' />}
			/>
		</div>
	</header>
);

export default AppHeader;
