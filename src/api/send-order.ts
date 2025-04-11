import request from './request';
import { ISendOrderRequestData, ISendOrderResponseData } from './types';

const sendOrder = async (
	data: ISendOrderRequestData
): Promise<ISendOrderResponseData> =>
	await request('orders', {
		body: JSON.stringify(data),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

export default sendOrder;
