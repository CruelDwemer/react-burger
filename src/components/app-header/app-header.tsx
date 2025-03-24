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
			<HeaderButton text='Конструктор' Icon={BurgerIcon} link='/' />
			<HeaderButton
				text='Лента заказов'
				Icon={ListIcon}
				buttonClassName={styles.rightButton}
				link='/login'
			/>
		</div>
		<Logo className={styles.logo} />
		<div
			className={classnames(styles.buttonWrapper, styles.profileButtonWrapper)}>
			<HeaderButton text='Личный кабинет' link='/profile' Icon={ProfileIcon} />
		</div>
	</header>
);

export default AppHeader;
