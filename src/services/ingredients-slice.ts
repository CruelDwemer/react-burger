import { getIngredients } from '../api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IIngredientData } from '../types';
import { IGetIngredientsResponse } from '../api/types';

export interface IIngredientsState {
	ingredients: IIngredientData[];
}

const getIngredientsQuery = createAsyncThunk<
	IGetIngredientsResponse | undefined
>('ingredients/getIngredients', async () => {
	try {
		return await getIngredients();
	} catch (error) {
		console.log(error);
	}
});

interface State {
	ingredients: IIngredientData[];
}

const ingredientsSlice = createSlice({
	name: 'ingredients',
	reducerPath: 'ingredients',
	reducers: {
		default: (state) => state,
	},
	initialState: { ingredients: [] },
	extraReducers: (builder) => {
		builder.addCase(getIngredientsQuery.fulfilled, (state: State, action) => {
			state.ingredients = (action.payload?.data || []) as IIngredientData[];
		});
	},
});

export { getIngredientsQuery, ingredientsSlice };
