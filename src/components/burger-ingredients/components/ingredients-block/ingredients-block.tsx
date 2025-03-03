import * as React from 'react';
import Ingredient from './ingredient';
import { DataInterface } from '../../../../types';
import styles from './styles.module.scss';
import {TAB} from '../../types';

interface Props {
	header: string;
	data: DataInterface[];
	onClick: (data: DataInterface) => void;
	type: TAB;
}

const IngredientsBlock = ({ header, data, onClick, type }: Props) => (
	<section className='section' data-type={type}>
		<h2 className={styles.header}>{header}</h2>
		<div className={styles.content}>
			{data.map((item) => (
				<Ingredient key={item._id} {...item} onClick={onClick.bind(null, item)} />
			))}
		</div>
	</section>
);

export default IngredientsBlock;
