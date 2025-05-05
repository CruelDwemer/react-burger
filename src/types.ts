export interface IIngredientData {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

export interface IUserData {
	login: string;
	password: string;
	name: string;
	email: string;
}

export interface IFeedOrder {
	createdAt: string;
	ingredients: Array<string>;
	number: number;
	status: string;
	updatedAt: string;
	name: string;
	_id: string;
}

export interface ISocketOrdersData {
	orders: Array<IFeedOrder>;
	total: number;
	totalToday: number;
	success: boolean;
}

export interface IIngredientWithUUID extends IIngredientData {
	uniqueId: string;
}

export interface ICountedIngredient extends IIngredientWithUUID {
	count: number;
}

export interface IFeedUpdatedOrder extends IFeedOrder {
	updatedIngredients: Array<ICountedIngredient>;
	price: number;
	date: string;
	uniqueId: string;
}

export interface IOrdersData {
	orders: Array<IFeedUpdatedOrder>;
	total: string;
	totalToday: string;
	working: number[];
	ready: number[];
	success: boolean;
}
