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
