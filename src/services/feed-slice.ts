import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFeedUpdatedOrder, IOrdersData } from '../types';
// import { stat } from 'fs';

export type FeedState = {
	ordersData: IOrdersData | null,
	personalOrdersData: IOrdersData | null,
}

const initialState: FeedState = {
	ordersData: null,
	personalOrdersData: null
}

const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		setOrders: (state, action: PayloadAction<IOrdersData>) => {
			state.ordersData = action.payload;
		},
		setPersonalOrders: (state, action: PayloadAction<IOrdersData>) => {
			state.personalOrdersData = action.payload;
		},
		clearOrders: (state) => {
			state.ordersData = null
		},
		clearPersonalOrders: (state) => {
			state.personalOrdersData = null
		}
	},
	selectors: {
		getUpdatedOrders: state => state.ordersData,
		getPersonalOrders: state => state.personalOrdersData
	}
})

const { setOrders, setPersonalOrders, clearOrders, clearPersonalOrders } = feedSlice.actions;
const { getUpdatedOrders, getPersonalOrders } = feedSlice.selectors;

export {  feedSlice, setOrders, getUpdatedOrders, clearOrders, getPersonalOrders, setPersonalOrders, clearPersonalOrders }