import * as React from 'react';
import styles from './styles.module.scss';

interface IProps {
	children: React.ReactNode;
}

const IngredientPage = ({ children }: IProps): React.JSX.Element => (
	<div className={styles.container}>{children}</div>
);

export default IngredientPage;
