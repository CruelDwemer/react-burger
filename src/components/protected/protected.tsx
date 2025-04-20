import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@services/index';
import { JSX } from 'react';
import { IUserState } from '@services/user-slice';

interface IProps {
	onlyUnAuth?: boolean;
	Component?: React.ComponentType;
	element?: JSX.Element;
}

const Protected = ({ onlyUnAuth = false, Component, element }: IProps) => {
	const location = useLocation();
	const { user, isAuthChecked } = useAppSelector(
		(state) => state.user as IUserState
	);

	if (!Component && !element) {
		console.error('Component or element must be provided');
		return null;
	}

	if (!isAuthChecked) {
		return null;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		const from = location.state ?? { pathname: '/' };
		return <Navigate to={from} />;
	}

	if (Component) {
		return <Component />;
	}

	if (element) {
		return element;
	}
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = (props: Omit<IProps, 'onlyUnAuth'>) => (
	<Protected {...props} onlyUnAuth={true} />
);
