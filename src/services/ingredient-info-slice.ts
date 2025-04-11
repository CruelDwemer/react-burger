import { createSlice } from '@reduxjs/toolkit';
import { IIngredientData } from '../types';

export interface IngredientInfoState {
	selectedIngredient: IIngredientData | null;
}

const initialState: IngredientInfoState = {
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
