import * as React from 'react';
import styles from './styles.module.scss';
import InfoBlock from './info-block';
import { DataInterface } from '../../types';

type Props = DataInterface;

const IngredientDetails = ({
	image,
	name,
	fat,
	calories,
	carbohydrates,
	proteins,
}: Props) => {
	return (
		<div className={styles.ingredient}>
			<h2 className={styles.header}>Детали ингредиента</h2>
			<img className={styles.image} src={image} alt={name} />
			<h3 className={styles.subheader}>{name}</h3>
			<div className={styles.consist}>
				<InfoBlock label='Калории,ккал' value={calories} />
				<InfoBlock label='Белки, г' value={proteins} />
				<InfoBlock label='Жиры, г' value={fat} />
				<InfoBlock label='Углеводы, г' value={carbohydrates} />
			</div>
		</div>
	);
};

export default IngredientDetails;
