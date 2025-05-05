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
import { Link } from 'react-router-dom';

const AppHeader = (): React.JSX.Element => (
	<header className={styles.header}>
		<div className={styles.buttonWrapper}>
			<HeaderButton text='Конструктор' Icon={BurgerIcon} link='/' />
			<HeaderButton
				text='Лента заказов'
				Icon={ListIcon}
				buttonClassName={styles.rightButton}
				link='/feed'
			/>
		</div>
		<Link to={'/'}>
			<Logo className={styles.logo} />
		</Link>
		<div
			className={classnames(styles.buttonWrapper, styles.profileButtonWrapper)}>
			<HeaderButton text='Личный кабинет' link='/profile' Icon={ProfileIcon} />
		</div>
	</header>
);

export default AppHeader;
