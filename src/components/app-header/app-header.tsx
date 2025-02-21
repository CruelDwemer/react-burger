import * as React from 'react';
// import headerLogo from '../../images/header-logo.svg';
import {
	Logo,
	Button,
	MoveButton,
	AddButton,
	RefreshButton,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';
import styles from './styles.module.css';
import IconButton from '../icon-button';
import HeaderButton from '../header-button/header-button';

const AppHeader = () => {
	const [active, setActive] = useState(false)
	return (
		<header
			style={{
				height: 88,
				// marginTop: 40,
				backgroundColor: '#242424',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '0 16px 0 16px',
				// width: '100%'
			}}>
			<div className={styles.buttonWrapper}>
				<Button htmlType='button' type='secondary' color='#8585AD'>
					<BurgerIcon type='primary' /> Конструктор
				</Button>
				<HeaderButton text='Лента заказов' icon={<ListIcon type='secondary'/>}></HeaderButton>
				{/*<IconButton*/}
				{/*	icon={<ListIcon type={'primary'} />}*/}
				{/*	text={'Лента заказов 1'}*/}
				{/*	// onClick={(e) => {console.log(e)}}*/}
				{/*/>*/}
				{/*<Button htmlType='button' type='secondary' color='#8585AD'>*/}
				{/*	<ListIcon type='secondary' /> Лента заказов*/}
				{/*</Button>*/}
			</div>
			<Logo />
			<div className={`${styles.buttonWrapper} ${styles.profileButtonWrapper}`}>
				<Button htmlType='button' type='secondary' color='#8585AD'>
					<ProfileIcon type='secondary' /> Личный кабинет
				</Button>
			</div>
		</header>
	);
};

export default AppHeader;
