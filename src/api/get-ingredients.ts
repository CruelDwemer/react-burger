import request from './request';
import { IGetIngredientsResponse } from './types';

const getIngredients = async (): Promise<IGetIngredientsResponse> =>
	await request('ingredients');

export default getIngredients;
