import * as React from 'react';
import AppHeader from '../app-header';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import styles from './app.module.scss';
import data from '../../data';
import { DataInterface } from '../burger-ingredients/types';

const App = () => {
	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients data={data as DataInterface[]} />
				<BurgerConstructor data={data as DataInterface[]} />
			</main>
		</>
	);
};

export default App;
