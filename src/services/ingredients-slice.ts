import { getIngredients } from '../api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IIngredientData } from '../types';
import { IGetIngredientsResponse } from '../api/types';

const getIngredientsQuery = createAsyncThunk<
	IGetIngredientsResponse | undefined
>('ingredients/getIngredients', async () => {
	try {
		return await getIngredients();
	} catch (error) {
		console.log(error);
	}
});

interface IIngredintsState {
	ingredients: IIngredientData[];
}

export const initialState: IIngredintsState = {
	ingredients: [],
};

const ingredientsSlice = createSlice({
	name: 'ingredients',
	reducerPath: 'ingredients',
	reducers: {
		default: (state) => state,
	},
	initialState,
	extraReducers: (builder) => {
		builder.addCase(
			getIngredientsQuery.fulfilled,
			(state: IIngredintsState, action) => {
				state.ingredients = (action.payload?.data || []) as IIngredientData[];
			}
		);
	},
});

export { getIngredientsQuery, ingredientsSlice };
