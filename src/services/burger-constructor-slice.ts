import { createSlice } from '@reduxjs/toolkit';
import { DataInterface } from '../types';
import { v4 } from 'uuid';

export interface IngredientsWithKey extends DataInterface {
	key: string;
}

export interface BurgerState {
	burgerList: IngredientsWithKey[];
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
				const key = v4();
				state.burgerList.push({ ...action.payload, key });
			}
		},
		removeIngredient: (state, action) => {
			state.burgerList = [
				...state.burgerList.filter(({ key }) => key !== action.payload),
			];
		},
		sortIngredients: (state, action) => {
			const { position, index } = action.payload;
			const copy: Array<DataInterface | string> = [...state.burgerList];
			console.log("state", state.burgerList);
			console.log("copy", [...state.burgerList]);
			const element = copy.splice(index, 1, 'placeholder')[0];
			console.log("element", state.burgerList);
			console.log("copy splice 1", [...copy]);
			copy.splice(position, 0, element);
			// const filtered =
			console.log("copy splice 2", [...copy]);
			console.log("filtered", [...copy.filter(
				(item) => item !== 'placeholder'
			)]);
			state.burgerList = copy.filter(
				(item) => item !== 'placeholder'
			) as IngredientsWithKey[];
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
