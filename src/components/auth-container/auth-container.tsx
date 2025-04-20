import styles from './styles.module.scss';
import * as React from 'react';

interface IProps {
	title: string;
	children: React.ReactNode;
}

const AuthContainer = ({ title, children }: IProps): React.JSX.Element => (
	<main className={styles.authWrapper}>
		<div className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			{children}
		</div>
	</main>
);

export default AuthContainer;
