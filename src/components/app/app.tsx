import * as React from 'react';
import { useState, useEffect } from 'react';
import AppHeader from '../app-header';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import styles from './app.module.scss';
import { DataInterface } from '../burger-ingredients/types';
import { getIngredients } from '../../api/get-ingredients';

const App = () => {
	const [ingredients, setIngredients] = useState<DataInterface[]>([]);

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const result = await getIngredients();
				setIngredients(result || []);
			} catch (error) {
				console.log(error);
			}
		};

		fetchIngredients();
	}, []);

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients data={ingredients as DataInterface[]} />
				<BurgerConstructor data={ingredients as DataInterface[]} />
			</main>
		</>
	);
};

export default App;
