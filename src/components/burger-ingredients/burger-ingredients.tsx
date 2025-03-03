import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import { ITab, TAB } from './types';
import { DataInterface } from '../../types';
import IngredientsBlock from './components/ingredients-block';
import Modal from '../modal';
import IngredientDetails from './components/ingredient-details';
import { useSelector } from 'react-redux';
import { Store } from '../../services/index';

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

	const [selectedIngredient, setSelectedIngredient] =
		useState<DataInterface | null>(null);
	const closeModal = setSelectedIngredient.bind(null, null);
	const selectIngredient = (ingredient: DataInterface) =>
		setSelectedIngredient(ingredient);

	const containerRef = useRef<HTMLDivElement | null>(null);

	const selectTab = (value: TAB) => {
		setSelectedTab(value);
		const sections = containerRef?.current?.querySelectorAll('.section') || [];
		if(sections) {
			const target = Array.from(sections).find(section => section.getAttribute('data-type') === value);
			if(target) {
				const { top } = target.getBoundingClientRect();
				console.log(value, top)
				target.scrollIntoView({ behavior: 'smooth' });
			}
		}

	};

	function handleScroll() {
		const sections = containerRef?.current?.querySelectorAll('.section') || [];
		let index = 0;

		sections.forEach((section, i) => {
			const { top } = section.getBoundingClientRect();
			if (top <= 300) {
				index = i;
			}
		});
		setSelectedTab(sections[index].getAttribute('data-type') as TAB);
	}

	useEffect(() => {
		const container = containerRef.current;
		if(container) {
			container.addEventListener('scroll', handleScroll);
			return () => container.removeEventListener('scroll', handleScroll);
		}
	}, [])

	const IngredientTab = ({ value, label }: ITab) => (
		<Tab
			active={selectedTab === value}
			value={value}
			onClick={selectTab as (value: string) => void}>
			{label}
		</Tab>
	);

	const { ingredients } = useSelector((state: Store) => state.ingredients);

	return (
		<>
			{selectedIngredient && (
				<Modal closeModal={closeModal}>
					<IngredientDetails {...selectedIngredient} />
				</Modal>
			)}
			<section >
				<h1 className={styles.header}>Соберите бургер</h1>
				<div className={styles.tabs}>
					{tabs.map((el, index) => (
						<IngredientTab key={index} {...el} />
					))}
				</div>
				<div className={styles.content} ref={containerRef}>
					{tabs.map((tab, index) => {
						const filteredData = ingredients.filter(({ type }) => type === tab.value);
						return (
							<IngredientsBlock
								key={index}
								header={tab.label}
								data={filteredData}
								onClick={selectIngredient}
								type={tab.value}
							/>
						);
					})}
				</div>
			</section>
		</>
	);
};

export default BurgerIngredients;
