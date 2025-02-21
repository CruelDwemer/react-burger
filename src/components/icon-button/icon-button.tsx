import * as React from 'react';
import {
	DetailedReactHTMLElement,
	FunctionComponent,
	MouseEventHandler,
	SyntheticEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

interface IExternalProps {
	text?: React.ReactNode | React.ReactNode[];
	icon: JSX.Element;
}

interface IconElementProps extends TIconProps {
	icon: JSX.Element;
}

const IconElement = ({ icon, ...props }: IconElementProps) => {
	return React.cloneElement(
		icon as DetailedReactHTMLElement<Partial<TIconProps>, HTMLElement>,
		{
			...props,
		}
	);
};

const IconButton = ({
	text,
	// IconComponent,
	icon,
	// onClick,
	...props
}: IExternalProps) => {
	// const iconEl = React.cloneElement(icon, { type: 'secondary' });
	const [hover, setHover] = useState(false);
	const ref = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const toggleHovered = (value: boolean) => setHover(value);
		const toHovered = toggleHovered.bind(null, true);
		const toLeaved = toggleHovered.bind(null, false);

		ref?.current?.addEventListener('mouseover', toHovered);
		ref?.current?.addEventListener('mouseout', toLeaved);
		return () => {
			ref?.current?.removeEventListener('mouseover', toHovered);
			ref?.current?.removeEventListener('mouseout', toLeaved);
		}
	}, []);

	return (
		<Button
			{...props}
			ref={ref}
			// onClick={onClick}
			className={styles.button}
			htmlType='button'
			type='secondary'
			size='medium'>
			<IconElement icon={icon} type={hover ? 'primary' : 'secondary'} /> {text}
		</Button>
	);
};

export default IconButton;
