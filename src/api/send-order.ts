import request from './request';
import { ISendOrderRequestData, ISendOrderResponseData } from './types';
import { getToken } from '@utils/cookies';

const sendOrder = async (
	data: ISendOrderRequestData
): Promise<ISendOrderResponseData> =>
	await request('orders', {
		body: JSON.stringify(data),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${await getToken()}`,
		},
	});

export default sendOrder;
