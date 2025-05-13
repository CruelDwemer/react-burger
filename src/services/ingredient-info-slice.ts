import { createSlice } from '@reduxjs/toolkit';
import { IIngredientData } from '../types';

export interface IIngredientInfoState {
	selectedIngredient: IIngredientData | null;
}

export const initialState: IIngredientInfoState = {
	selectedIngredient: null,
};

const ingredientInfoSlice = createSlice({
	name: 'ingredientInfo',
	initialState,
	reducers: {
		setIngredientInfo: (state, action) => {
			state.selectedIngredient = action.payload;
		},
		removeIngredientInfo: (state) => {
			state.selectedIngredient = null;
		},
	},
});

const { setIngredientInfo, removeIngredientInfo } = ingredientInfoSlice.actions;

export { ingredientInfoSlice, setIngredientInfo, removeIngredientInfo };
