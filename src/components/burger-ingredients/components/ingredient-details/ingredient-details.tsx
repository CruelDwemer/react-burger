import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import InfoBlock from './info-block';
import { DataInterface } from '../../../../types';
import { useParams } from 'react-router';
import { useAppSelector } from '@services/index';
import classnames from '@utils/classnames';

interface IProps {
	centeredHeader?: boolean;
}

const IngredientDetails = ({
	centeredHeader = false,
}: IProps): React.JSX.Element | null => {
	const [ingredient, setIngredient] = useState<DataInterface | null>(null);

	const { ingredients } = useAppSelector((state) => state.ingredients);
	const params = useParams();

	useEffect(() => {
		const handleState = () => {
			const ingredient = ingredients.find(
				(item: DataInterface) => item._id === params.id
			);
			if (ingredient) {
				setIngredient(ingredient);
			}
		};
		handleState();
	}, [ingredients]);

	if (!ingredient) {
		return null;
	}

	const { image, name, fat, calories, carbohydrates, proteins } = ingredient;
	return (
		<div className={styles.ingredient}>
			<h2
				className={classnames(
					styles.header,
					centeredHeader && styles.headerCentered
				)}>
				Детали ингредиента
			</h2>
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
