import { describe, it, expect } from '@jest/globals';
import {
	websocketSlice,
	initialState,
	wsOpen,
	wsError,
	wsMessage,
	wsClose,
	wsConnecting,
	wsClearOrders,
} from '@services/websocket-slice';

const socketOrdersData = {
	total: 12,
	totalToday: 12,
	success: true,
	orders: [
		{
			createdAt: '12',
			ingredients: ['1', '2', '3'],
			number: 1,
			status: 'done',
			updatedAt: '115',
			name: 'name',
			_id: '1',
		},
	],
};

describe('Websocket slice tests', () => {
	it('check initialization', () => {
		const state = websocketSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('Should update connecting status', () => {
		expect(
			websocketSlice.reducer(initialState, { type: wsConnecting.type })
		).toEqual({
			...initialState,
			status: 'CONNECTING...',
		});
	});

	it('Should update open status', () => {
		expect(websocketSlice.reducer(initialState, { type: wsOpen.type })).toEqual(
			{
				...initialState,
				status: 'ONLINE',
				error: null,
			}
		);
	});

	it('Should update offline status', () => {
		expect(
			websocketSlice.reducer(initialState, { type: wsClose.type })
		).toEqual({
			...initialState,
			status: 'OFFLINE',
		});
	});

	it('Should set error', () => {
		expect(
			websocketSlice.reducer(initialState, {
				type: wsError.type,
				payload: 'error',
			})
		).toEqual({
			...initialState,
			error: 'error',
		});
	});

	it('Should save orders to store', () => {
		expect(
			websocketSlice.reducer(initialState, {
				type: wsMessage.type,
				payload: socketOrdersData,
			})
		).toEqual({
			...initialState,
			orders: socketOrdersData,
		});
	});

	it('Should remove orders from store', () => {
		expect(
			websocketSlice.reducer(
				{ ...initialState, orders: socketOrdersData },
				{ type: wsClearOrders.type, payload: socketOrdersData }
			)
		).toEqual({
			...initialState,
			orders: null,
		});
	});
});
