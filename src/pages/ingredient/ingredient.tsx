import * as React from 'react';
import styles from './styles.module.scss';

interface Props {
	children: React.ReactNode;
}

const IngredientPage = ({ children }: Props) => (
	<div className={styles.container}>{children}</div>
);

export default IngredientPage;
