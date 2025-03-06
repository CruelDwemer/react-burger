import { createSlice } from '@reduxjs/toolkit';
import { DataInterface } from '../types';
import { v4 } from 'uuid';
import { INGREDIENT_TYPE } from '../components/burger-ingredients/types';

export interface IngredientsWithKey extends DataInterface {
	key: string;
}

export interface BurgerState {
	burgerList: IngredientsWithKey[];
	bun: DataInterface | null;
}

const initialState: BurgerState = {
	burgerList: [],
	bun: null,
};

const burgerConstructorSlice = createSlice({
	name: 'burger',
	initialState,
	reducers: {
		addIngredient: (state, action) => {
			if (action.payload.type === INGREDIENT_TYPE.BUN) {
				state.bun = action.payload;
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
			const element = copy.splice(index, 1, 'placeholder')[0];
			copy.splice(position, 0, element);
			state.burgerList = copy.filter(
				(item) => item !== 'placeholder'
			) as IngredientsWithKey[];
		},
		flushIngredients: () => initialState,
	},
});

const { addIngredient, removeIngredient, sortIngredients, flushIngredients } =
	burgerConstructorSlice.actions;

export {
	burgerConstructorSlice,
	addIngredient,
	removeIngredient,
	sortIngredients,
	flushIngredients,
};
