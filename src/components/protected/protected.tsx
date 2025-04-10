import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStore } from '@services/index';
import { JSX } from 'react';

interface Props {
	onlyUnAuth?: boolean;
	Component?: React.ComponentType<any>;
	element?: JSX.Element;
}

const Protected = ({ onlyUnAuth = false, Component, element }: Props) => {
	const location = useLocation();
	const { user, isAuthChecked } = useSelector((state: IStore) => state.user);

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
export const OnlyUnAuth = (props: Omit<Props, 'onlyUnAuth'>) => (
	<Protected {...props} onlyUnAuth={true} />
);
