import { getIngredients } from '../api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IIngredientData } from '../types';
import { IGetIngredientsResponse } from '../api/types';

export interface IngredientsState {
	ingredients: IIngredientData[];
}

const getIngredientsQuery = createAsyncThunk<
	IGetIngredientsResponse | Promise<unknown>
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
	initialState: { ingredients: [] } as State,
	extraReducers: (builder) => {
		builder.addCase(getIngredientsQuery.fulfilled, (state: State, action) => {
			state.ingredients = (action.payload as IGetIngredientsResponse)
				?.data as IIngredientData[];
		});
	},
});

export { getIngredientsQuery, ingredientsSlice };
