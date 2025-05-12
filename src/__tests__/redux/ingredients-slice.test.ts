import { describe, it, expect } from '@jest/globals';
import {
	ingredientsSlice,
	initialState,
	getIngredientsQuery,
} from '@services/ingredients-slice';
import {ingredientMock} from '../../__mocks__/mocks';

describe('Ingredients slice tests', () => {
	it('Should return initial state', () => {
		expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('Should save ingredients', () => {
		expect(
			ingredientsSlice.reducer(initialState, {
				type: getIngredientsQuery.fulfilled.type,
				payload: { data: [ingredientMock] },
			})
		).toEqual({
			...initialState,
			ingredients: [ingredientMock],
		});
	});
});
