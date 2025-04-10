import * as React from 'react';
import { useRef, useState, UIEventHandler } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import { ITab, INGREDIENT_TYPE } from './types';
import IngredientsBlock from './components/ingredients-block';
import { useAppSelector } from '@services/index';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs: ITab[] = [
	{
		value: INGREDIENT_TYPE.BUN,
		label: 'Булки',
	},
	{
		value: INGREDIENT_TYPE.SAUCE,
		label: 'Соусы',
	},
	{
		value: INGREDIENT_TYPE.MAIN,
		label: 'Начинки',
	},
];

const BurgerIngredients = (): React.JSX.Element => {
	const [selectedTab, setSelectedTab] = useState<INGREDIENT_TYPE>(
		INGREDIENT_TYPE.BUN
	);

	const location = useLocation();
	const navigate = useNavigate();

	const selectIngredient = (dataId: string): void => {
		navigate(`/ingredients/${dataId}`, { state: { background: location } });
	};

	const containerRef = useRef<HTMLDivElement | null>(null);

	const selectTab = (value: INGREDIENT_TYPE): void => {
		const sections = containerRef?.current?.querySelectorAll('.section') || [];
		if (sections) {
			const target = Array.from(sections).find(
				(section) => section.getAttribute('data-type') === value
			);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};

	const handleScroll: UIEventHandler<HTMLDivElement> = ({ target }) => {
		if (target instanceof HTMLDivElement) {
			const sections = target.querySelectorAll('.section') || [];
			let index = 0;

			sections.forEach((section, i) => {
				const { top } = section.getBoundingClientRect();
				if (top <= 300) {
					index = i;
				}
			});
			setSelectedTab(
				sections[index].getAttribute('data-type') as INGREDIENT_TYPE
			);
		}
	};

	const IngredientTab = ({ value, label }: ITab): React.JSX.Element => (
		<Tab
			active={selectedTab === value}
			value={value}
			onClick={selectTab as (value: string) => void}>
			{label}
		</Tab>
	);

	const { ingredients } = useAppSelector((state) => state.ingredients);

	return (
		<>
			<section>
				<h1 className={styles.header}>Соберите бургер</h1>
				<div className={styles.tabs}>
					{tabs.map((el, index) => (
						<IngredientTab key={index} {...el} />
					))}
				</div>
				<div
					className={styles.content}
					ref={containerRef}
					onScroll={handleScroll}>
					{tabs.map((tab, index) => {
						const filteredData = ingredients.filter(
							({ type }) => type === tab.value
						);
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
