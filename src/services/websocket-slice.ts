import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISocketOrdersData } from '../types';

enum WebsocketStatus {
	CONNECTING = 'CONNECTING...',
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}

export type WebsocketStore = {
	status: WebsocketStatus;
	orders: ISocketOrdersData | null;
	error: string | null;
};

export const initialState: WebsocketStore = {
	status: WebsocketStatus.OFFLINE,
	orders: null,
	error: null,
};

export const websocketSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {
		wsConnecting: (state) => {
			state.status = WebsocketStatus.CONNECTING;
		},
		wsOpen: (state) => {
			state.status = WebsocketStatus.ONLINE;
			state.error = null;
		},
		wsClose: (state) => {
			state.status = WebsocketStatus.OFFLINE;
		},
		wsError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		wsMessage: (state, action: PayloadAction<ISocketOrdersData>) => {
			state.orders = action.payload;
		},
		wsClearOrders: (state) => {
			state.orders = null;
		},
	},
	selectors: {
		getStatus: (state) => state.status,
		getError: (state) => state.error,
		getOrders: (state) => state.orders,
	},
});

const { wsConnecting, wsClose, wsError, wsMessage, wsOpen, wsClearOrders } =
	websocketSlice.actions;
const { getError, getStatus, getOrders } = websocketSlice.selectors;

export {
	wsConnecting,
	wsClose,
	wsError,
	wsMessage,
	wsOpen,
	wsClearOrders,
	getError,
	getStatus,
	getOrders,
};

type TActionCreators = typeof websocketSlice.actions;
export type TWsInternalActions = ReturnType<
	TActionCreators[keyof TActionCreators]
>;
