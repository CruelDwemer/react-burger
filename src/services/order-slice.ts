import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendOrder } from '../api';
import { flushIngredients } from './burger-constructor-slice';

interface OrderInfo {
	success: boolean;
	name?: string;
	order?: {
		number: number;
	};
}

export interface OrderState {
	orderInfo: OrderInfo;
}

const sendOrderInfo = createAsyncThunk(
	'order/sendOrderInfo',
	async (data: { ingredients: string[] }, { dispatch }) => {
		try {
			const response = await sendOrder(data);
			if (response) {
				dispatch(flushIngredients());
				return response;
			}
		} catch (error) {
			console.log(error);
		}
	}
);

const initialState: OrderState = {
	orderInfo: { success: false },
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		flushState: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(sendOrderInfo.fulfilled, (state: OrderState, action) => {
			state.orderInfo = action.payload as OrderInfo;
		});
	},
});

const { flushState } = orderSlice.actions;

export { flushState, orderSlice, sendOrderInfo };
