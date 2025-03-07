import request from './request';
import { DataInterface } from '../types';

interface GetIngredientsResponse {
	data: DataInterface[];
	success: boolean;
}

const getIngredients = async () => {
	const response = await request('ingredients');
	const result: GetIngredientsResponse = await response.json();
	return result.data;
};

export default getIngredients;
