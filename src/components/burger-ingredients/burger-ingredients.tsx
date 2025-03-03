import * as React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './styles.module.scss';
import { DataInterface, TAB, ITab } from './types';
import IngredientsBlock from './components/ingredients-block';
import Modal from '../modal';
import IngredientDetails from './components/ingredient-details';

const tabs: ITab[] = [
	{
		value: TAB.BUN,
		label: 'Булки',
	},
	{
		value: TAB.SAUCE,
		label: 'Соусы',
	},
	{
		value: TAB.MAIN,
		label: 'Начинки',
	},
];

interface Props {
	data: DataInterface[];
}

const BurgerIngredients = ({ data }: Props) => {
	const [selectedTab, setSelectedTab] = useState<TAB>(TAB.BUN);
	const selectTab = (value: TAB) => setSelectedTab(value);

	const [selectedIngredient, setSelectedIngredient] =
		useState<DataInterface | null>(null);
	const closeModal = setSelectedIngredient.bind(null, null);
	const selectIngredient = (ingredient: DataInterface) =>
		setSelectedIngredient(ingredient);

	const IngredientTab = ({ value, label }: ITab) => (
		<Tab
			active={selectedTab === value}
			value={value}
			onClick={selectTab as (value: string) => void}>
			{label}
		</Tab>
	);

	return (
		<>
			{selectedIngredient && (
				<Modal closeModal={closeModal}>
					<IngredientDetails {...selectedIngredient} />
				</Modal>
			)}
			<section>
				<h1 className={styles.header}>Соберите бургер</h1>
				<div className={styles.tabs}>
					{tabs.map((el, index) => (
						<IngredientTab key={index} {...el} />
					))}
				</div>
				<div className={styles.content}>
					{tabs.map((tab, index) => {
						const filteredData = data.filter(({ type }) => type === tab.value);
						return (
							<IngredientsBlock
								key={index}
								header={tab.label}
								data={filteredData}
								onClick={selectIngredient}
							/>
						);
					})}
				</div>
			</section>
		</>
	);
};

export default BurgerIngredients;
