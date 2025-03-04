import { createSlice } from '@reduxjs/toolkit';
import { DataInterface } from '../types';

export interface BurgerState {
	burgerList: DataInterface[];
	bunSelected: boolean;
	bun: DataInterface | null;
}

const burgerConstructorSlice = createSlice({
	name: 'burger',
	initialState: {
		burgerList: [],
		bunSelected: false,
		bun: null,
	} as BurgerState,
	reducers: {
		addIngredient: (state, action) => {
			if (action.payload.type === 'bun') {
				state.bun = action.payload;
				state.bunSelected = true;
			} else {
				state.burgerList.push(action.payload);
			}
		},
		removeIngredient: (state, action) => {
			const copy = [...state.burgerList];
			copy.splice(action.payload, 1);
			state.burgerList = copy;
		},
		sortIngredients: (state, action) => {
			const { position, index } = action.payload;
			const copy: Array<DataInterface | string> = [...state.burgerList];
			const element = copy.splice(index, 1, 'placeholder')[0];
			copy.splice(position, 0, element);
			// const filtered =
			state.burgerList = copy.filter(
				(item) => item !== 'placeholder'
			) as DataInterface[];
		},
	},
});

const { addIngredient, removeIngredient, sortIngredients } =
	burgerConstructorSlice.actions;

export {
	burgerConstructorSlice,
	addIngredient,
	removeIngredient,
	sortIngredients,
};
