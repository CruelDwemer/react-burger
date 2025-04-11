import styles from './styles.module.scss';
import * as React from 'react';

interface IProps {
	label: string;
	value: React.ReactNode;
}

const InfoBlock = ({ label, value }: IProps): React.JSX.Element => (
	<div className={styles.block}>
		<p className={styles.label}>{label}</p>
		<p className={styles.value}>{value}</p>
	</div>
);

export default InfoBlock;
