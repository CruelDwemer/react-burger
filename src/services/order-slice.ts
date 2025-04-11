import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendOrder } from '../api';
import { flushIngredients } from './burger-constructor-slice';
import { ISendOrderRequestData, ISendOrderResponseData } from '../api/types';

const sendOrderInfo = createAsyncThunk<
	ISendOrderResponseData | Promise<unknown>,
	ISendOrderRequestData
>('order/sendOrderInfo', async (data: ISendOrderRequestData, { dispatch }) => {
	try {
		const response = await sendOrder(data);
		if (response) {
			dispatch(flushIngredients());
			return response;
		}
	} catch (error) {
		console.log(error);
	}
});

export interface IOrderState {
	orderInfo: ISendOrderResponseData['order'] | null;
}

const initialState: IOrderState = {
	orderInfo: null,
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		flushState: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(sendOrderInfo.fulfilled, (state: IOrderState, action) => {
			state.orderInfo = (action.payload as ISendOrderResponseData)?.order;
		});
	},
});

const { flushState } = orderSlice.actions;

export { flushState, orderSlice, sendOrderInfo };
