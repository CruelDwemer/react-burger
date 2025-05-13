import {
	ingredientInfoSlice,
	initialState,
} from '@services/ingredient-info-slice';
import { describe, expect, it } from '@jest/globals';
import { ingredientMock as ingredientInfo } from '../../__mocks__/mocks';

describe('Ingredient info slice tests', () => {
	it('Should return initial state', () => {
		expect(ingredientInfoSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('Should set ingredient info', () => {
		expect(
			ingredientInfoSlice.reducer(initialState, {
				type: ingredientInfoSlice.actions.setIngredientInfo.type,
				payload: ingredientInfo,
			})
		).toEqual({ ...initialState, selectedIngredient: ingredientInfo });
	});

	it('Should flush ingredient info', () => {
		const state = { ...initialState, selectedIngredient: ingredientInfo };
		expect(
			ingredientInfoSlice.reducer(state, {
				type: ingredientInfoSlice.actions.removeIngredientInfo.type,
			})
		).toEqual(initialState);
	});
});
