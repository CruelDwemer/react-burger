import { describe, expect, it } from '@jest/globals';
import {
	orderSlice,
	initialState,
	sendOrderInfo,
	flushState,
} from '@services/order-slice';

describe('Order slice tests', () => {
	it('Should return initial state', () => {
		const state = orderSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('Should set order info', () => {
		const order = { number: 1 };
		const payload = { success: true, order };
		expect(
			orderSlice.reducer(initialState, {
				type: sendOrderInfo.fulfilled.type,
				payload,
			})
		).toEqual({
			...initialState,
			orderInfo: order,
		});
	});

	it('Should clear order info', () => {
		expect(
			orderSlice.reducer(
				{ ...initialState, orderInfo: { number: 1 } },
				{ type: flushState.type }
			)
		).toEqual(initialState);
	});
});
