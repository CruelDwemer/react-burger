import * as React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, DetailedReactHTMLElement, ReactElement } from 'react';
import styles from './styles.module.css';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

interface Props {
	text: string;
	icon: ReactElement<TIconProps, any>;
	active?: boolean;
}

const HeaderButton: FC<Props> = ({ icon, text, active = false }) => {
	const iconEl = React.cloneElement(
		icon as DetailedReactHTMLElement<
			{ className: string; type: string },
			HTMLElement
		>,
		{
			type: active ? 'primary' : 'secondary',
			className: styles.icon,
		}
	);
	return (
		<Button
			htmlType='button'
			type='secondary'
			color='#8585AD'
			className={`${styles.button} ${active ? styles.buttonActive : ''}`}>
			{iconEl} {text}
		</Button>
	);
};

export default HeaderButton;
