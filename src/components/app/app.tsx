import * as React from 'react';
import { useEffect } from 'react';
import AppHeader from '../app-header';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import styles from './app.module.scss';
import { Provider, useDispatch } from 'react-redux';
import { configureStore, AnyAction } from '@reduxjs/toolkit';
import rootReducer, { getIngredientsQuery } from '../../services';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getIngredientsQuery() as unknown as AnyAction);
	}, [dispatch]);

	return (
		<>
			<AppHeader />
			<DndProvider backend={HTML5Backend}>
				<main className={styles.main}>
					<BurgerIngredients />
					<BurgerConstructor />
				</main>
			</DndProvider>
		</>
	);
};

const AppWithProvider = () => {
	const store = configureStore({
		reducer: rootReducer,
		devTools: true,
	});

	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};

export default AppWithProvider;
