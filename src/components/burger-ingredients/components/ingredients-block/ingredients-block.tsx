import * as React from 'react';
import Ingredient from '../ingredient';
import { DataInterface } from '../../types';
import styles from './styles.module.scss';

interface Props {
	header: string;
	data: DataInterface[];
}

const IngredientsBlock = ({ header, data }: Props) => {
	return (
		<>
			<h2 className={styles.header}>{header}</h2>
			<div className={styles.content}>
				{data.map((bun) => (
					<Ingredient key={bun._id} {...bun} showModal={() => {}} />
				))}
			</div>
		</>
	);
};

export default IngredientsBlock;
