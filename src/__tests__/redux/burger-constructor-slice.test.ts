import { describe, it, expect, jest } from '@jest/globals';
import {
	burgerConstructorSlice,
	initialState,
	addIngredient,
	flushIngredients,
	removeIngredient,
	sortIngredients,
	IBurgerState,
} from '@services/burger-constructor-slice';
import { ingredientMock, ingredientWithKeyMock } from '../../__mocks__/mocks';

jest.mock('uuid', () => ({
	v4: jest.fn(() => 'mocked-unique-id'),
}));

describe('Burger Constructor slice tests', () => {
	it('check initialization', () => {
		const state = burgerConstructorSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('Should return state with added bun', () => {
		expect(
			burgerConstructorSlice.reducer(initialState, {
				type: addIngredient.type,
				payload: { ...ingredientMock, type: 'bun' },
			})
		).toEqual({
			...initialState,
			bun: { ...ingredientMock, type: 'bun' },
		});
	});

	it('Should return state with added non-bun ingredient', () => {
		expect(
			burgerConstructorSlice.reducer(initialState, {
				type: addIngredient.type,
				payload: ingredientMock,
			})
		).toEqual({
			...initialState,
			burgerList: [{ ...ingredientMock }],
		});
	});

	it('Should correctly add key', () => {
		const action = addIngredient(ingredientMock);
		expect(action.payload).toEqual({
			...ingredientMock,
			key: 'mocked-unique-id',
		});

		expect(burgerConstructorSlice.reducer(initialState, action)).toEqual({
			...initialState,
			burgerList: [{ ...ingredientMock, key: 'mocked-unique-id' }],
		});
	});

	it('Should remove ingredient', () => {
		expect(
			burgerConstructorSlice.reducer(
				{
					...initialState,
					burgerList: [ingredientWithKeyMock],
				} as IBurgerState,
				{ type: removeIngredient.type, payload: '0' }
			)
		).toEqual(initialState);
	});

	it('Should sort ingredients', () => {
		const first = { ...ingredientMock, name: 'first' };
		const second = { ...ingredientMock, name: 'second' };
		expect(
			burgerConstructorSlice.reducer(
				{
					...initialState,
					burgerList: [first, second],
				} as IBurgerState,
				{ type: sortIngredients.type, payload: { position: 2, index: 0 } }
			)
		).toEqual({
			...initialState,
			burgerList: [second, first],
		});
	});

	it('Should flush ingredients list', () => {
		expect(
			burgerConstructorSlice.reducer(
				{ ...initialState, burgerList: [ingredientMock] } as IBurgerState,
				{ type: flushIngredients.type }
			)
		).toEqual(initialState);
	});
});
