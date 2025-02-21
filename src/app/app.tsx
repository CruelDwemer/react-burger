import * as React from 'react';
import AppHeader from '../components/app-header';
import BurgerIngredients from '../components/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor';

const App = () => {
	return (
		<>
			<AppHeader />
			<BurgerIngredients />
			<BurgerConstructor />
		</>
	);
};

export default App;
