import { describe, it, expect } from '@jest/globals';
import {
	feedSlice,
	initialState,
	setOrders,
	setPersonalOrders,
	clearPersonalOrders,
	clearOrders,
} from '@services/feed-slice';
import { ordersDataMock } from '../../__mocks__/mocks';

describe('Feed slice tests', () => {
	it('Should return initial state', () => {
		const state = feedSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('Should set orders data', () => {
		expect(
			feedSlice.reducer(initialState, {
				type: setOrders.type,
				payload: ordersDataMock,
			})
		).toEqual({
			...initialState,
			ordersData: ordersDataMock,
		});
	});

	it('Should set personalOrders data', () => {
		expect(
			feedSlice.reducer(initialState, {
				type: setPersonalOrders.type,
				payload: ordersDataMock,
			})
		).toEqual({
			...initialState,
			personalOrdersData: ordersDataMock,
		});
	});

	it('Should clear orders data', () => {
		expect(
			feedSlice.reducer(
				{ ...initialState, ordersData: ordersDataMock },
				{ type: clearOrders.type }
			)
		).toEqual(initialState);
	});

	it('Should clear personalOrders data', () => {
		expect(
			feedSlice.reducer(
				{ ...initialState, personalOrdersData: ordersDataMock },
				{ type: clearPersonalOrders.type }
			)
		).toEqual(initialState);
	});
});
