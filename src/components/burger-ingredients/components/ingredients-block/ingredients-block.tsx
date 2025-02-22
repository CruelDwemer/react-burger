import * as React from 'react';
import Ingredient from './ingredient';
import { DataInterface } from '../../types';
import styles from './styles.module.scss';

interface Props {
	header: string;
	data: DataInterface[];
	onClick: (data: DataInterface) => void;
}

const IngredientsBlock = ({ header, data, onClick }: Props) => (
	<>
		<h2 className={styles.header}>{header}</h2>
		<div className={styles.content}>
			{data.map((item) => (
				<Ingredient key={item._id} {...item} onClick={(onClick.bind(null, item))} />
			))}
		</div>
	</>
);

export default IngredientsBlock;
