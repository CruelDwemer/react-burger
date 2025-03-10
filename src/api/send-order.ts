import request from './request';

export interface SendOrderRequestData {
	ingredients: string[];
}

const sendOrder = async (data: SendOrderRequestData) => {
	const response = await request('orders', {
		body: JSON.stringify(data),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return await response.json();
};

export default sendOrder;
