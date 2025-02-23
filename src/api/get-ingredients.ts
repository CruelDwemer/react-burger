import { BASE_URL } from '@utils/constants';

const getIngredients = async () => {
	const response = await fetch(`${BASE_URL}ingredients`);
	if (!response.ok) {
		return Promise.reject(`Ошибка ${response.status}`);
	}
	const result = await response.json();
	return result.data;
};

export { getIngredients };
