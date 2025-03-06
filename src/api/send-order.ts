import { BASE_URL } from '@utils/constants';

const sendOrder = async (data: any) => {
	const response = await fetch(`${BASE_URL}orders`, {
		body: JSON.stringify(data),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (!response.ok) {
		return Promise.reject(`Ошибка ${response.status}`);
	}
	return await response.json();
};

export default sendOrder;
