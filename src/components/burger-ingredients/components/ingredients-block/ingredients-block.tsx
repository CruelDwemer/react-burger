import * as React from 'react';
import Ingredient from './ingredient';
import { IIngredientData } from '../../../../types';
import styles from './styles.module.scss';
import { INGREDIENT_TYPE } from '../../types';

interface IProps {
	header: string;
	data: IIngredientData[];
	onClick: (dataId: string) => void;
	type: INGREDIENT_TYPE;
}

const IngredientsBlock = ({
	header,
	data,
	onClick,
	type,
}: IProps): React.JSX.Element => (
	<section className='section' data-type={type}>
		<h2 className={styles.header}>{header}</h2>
		<div className={styles.content}>
			{data.map((item) => (
				<Ingredient
					key={item._id}
					{...item}
					onClick={onClick.bind(null, item._id)}
				/>
			))}
		</div>
	</section>
);

export default IngredientsBlock;
