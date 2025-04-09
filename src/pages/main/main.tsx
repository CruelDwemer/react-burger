import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './styles.module.scss';
import BurgerIngredients from '../../components/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor';
import { DndProvider } from 'react-dnd';
import * as React from 'react';
import { JSX } from 'react';

const MainPage = (): JSX.Element => (
	<DndProvider backend={HTML5Backend}>
		<main className={styles.main}>
			<BurgerIngredients />
			<BurgerConstructor />
		</main>
	</DndProvider>
);

export default MainPage;
