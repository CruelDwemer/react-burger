import * as React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './styles.module.scss';
import data from './data';
import { DataInterface, TAB, ITab } from './types';
import IngredientsBlock from './components/ingredients-block';

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

const BurgerIngredients = () => {
	const [selectedTab, setSelectedTab] = useState<TAB>(TAB.BUN);

	const selectTab = (value: TAB) => setSelectedTab(value);

	const IngredientTab = ({ value, label }: ITab) => (
		<Tab
			active={selectedTab === value}
			value={value}
			onClick={selectTab as (value: string) => void}>
			{label}
		</Tab>
	);

	return (
		<div>
			<h1 className={styles.header}>Соберите бургер</h1>
			<div className={styles.tabs}>
				{tabs.map((el, index) => (
					<IngredientTab key={index} {...el} />
				))}
			</div>
			<div className={styles.content}>
				{tabs.map((tab, index) => {
					const filteredData = (data as DataInterface[]).filter(
						({ type }) => type === tab.value
					);
					return (
						<IngredientsBlock
							key={index}
							header={tab.label}
							data={filteredData}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default BurgerIngredients;
