import { IIngredientData, IOrdersData } from '../types';
import { IngredientWithKey } from '@services/burger-constructor-slice';

export const ingredientMock: IIngredientData = {
	_id: '643d69a5c3f7b9001cfa093c',
	name: 'Краторная булка N-200i',
	type: 'sauce',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	__v: 0,
};

export const ingredientWithKeyMock: IngredientWithKey = {
	_id: '643d69a5c3f7b9001cfa093c',
	name: 'Краторная булка N-200i',
	type: 'sauce',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	__v: 0,
	key: '0',
};

export const ordersDataMock: IOrdersData = {
	orders: [],
	total: '12',
	totalToday: '12',
	working: [1, 2],
	ready: [1, 2],
	success: true,
};
