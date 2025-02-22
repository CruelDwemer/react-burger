import { BASE_URL } from '@utils/constants';

const getIngredients = async () => {
	const response = await fetch(`${BASE_URL}ingredients`);
	const result = await response.json();
	return result.data;
};

export { getIngredients };
