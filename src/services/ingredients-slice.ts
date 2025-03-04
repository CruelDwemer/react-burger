import { getIngredients } from '../api/get-ingredients';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DataInterface } from '../types';

const getIngredientsQuery = createAsyncThunk(
	'ingredients/getIngredients',
	async () => {
		try {
			return await getIngredients();
		} catch (error) {
			console.log(error);
		}
	}
);

interface State {
	ingredients: DataInterface[];
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
			state.ingredients = action.payload as DataInterface[];
		});
	},
});

export { getIngredientsQuery, ingredientsSlice };
