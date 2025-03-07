import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataInterface } from '../types';
import { v4 } from 'uuid';
import { INGREDIENT_TYPE } from '../components/burger-ingredients/types';

export interface IngredientWithKey extends DataInterface {
	key: string;
}

export interface BurgerState {
	burgerList: IngredientWithKey[];
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
		addIngredient: {
			reducer: (state, action: PayloadAction<IngredientWithKey>) => {
				if (action.payload.type === INGREDIENT_TYPE.BUN) {
					state.bun = action.payload;
				} else {
					state.burgerList.push(action.payload);
				}
			},
			prepare: (ingredient: DataInterface) => {
				const key = v4();
				return { payload: { ...ingredient, key } };
			},
		},
		removeIngredient: (state, action) => {
			state.burgerList = [
				...state.burgerList.filter(({ key }) => key !== action.payload),
			];
		},
		sortIngredients: (state, action) => {
			const { position, index } = action.payload;
			const ingredients: Array<DataInterface | string> = [...state.burgerList];
			ingredients.splice(
				position,
				0,
				ingredients.splice(index, 1, 'placeholder')[0]
			);
			state.burgerList = ingredients.filter(
				(item) => item !== 'placeholder'
			) as IngredientWithKey[];
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
