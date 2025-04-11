import * as React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import classnames from '@utils/classnames';
import { NavLink } from 'react-router-dom';

interface IProps {
	text: string;
	active?: boolean;
	buttonClassName?: string;
	Icon: React.ComponentType<TIconProps>;
	link: string;
}

const HeaderButton = ({
	Icon,
	text,
	link,
	buttonClassName = '',
}: IProps): React.JSX.Element => (
	<NavLink to={link}>
		{({ isActive }) => (
			<Button
				htmlType='button'
				type='secondary'
				color='#8585AD'
				className={classnames(
					styles.button,
					isActive && styles.buttonActive,
					buttonClassName as string
				)}>
				<Icon
					type={isActive ? 'primary' : 'secondary'}
					className={styles.icon}
				/>
				{` ${text}`}
			</Button>
		)}
	</NavLink>
);

export default HeaderButton;
