import { DataInterface } from '../types';
import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients-slice';
import {
	burgerConstructorSlice,
	BurgerState,
} from './burger-constructor-slice';

const rootReducer = combineSlices(ingredientsSlice, burgerConstructorSlice);
export default rootReducer;

export interface Store {
	ingredients: {
		ingredients: DataInterface[];
	};
	burger: BurgerState;
}

export { ingredientsSlice, getIngredientsQuery } from './ingredients-slice';
export {
	addIngredient,
	removeIngredient,
	sortIngredients,
} from './burger-constructor-slice';
