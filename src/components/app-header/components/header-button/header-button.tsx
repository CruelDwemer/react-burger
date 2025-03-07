import * as React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './styles.module.css';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import classnames from '@utils/classnames';

interface Props {
	text: string;
	active?: boolean;
	buttonClassName?: string;
	Icon: React.ComponentType<TIconProps>;
}

const HeaderButton: FC<Props> = ({
	Icon,
	text,
	active = false,
	buttonClassName = '',
}) => (
	<Button
		htmlType='button'
		type='secondary'
		color='#8585AD'
		className={classnames(
			styles.button,
			active && styles.buttonActive,
			buttonClassName as string
		)}>
		<Icon type={active ? 'primary' : 'secondary'} className={styles.icon} />{' '}
		{text}
	</Button>
);

export default HeaderButton;
