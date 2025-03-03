import { DataInterface } from '../types';
import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients-slice';

const rootReducer = combineSlices(ingredientsSlice);
export default rootReducer;

export interface Store {
	ingredients: {
		ingredients: DataInterface[];
	};
}

export { ingredientsSlice, getIngredientsQuery } from './ingredients-slice';
