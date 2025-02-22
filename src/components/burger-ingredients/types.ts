export enum TAB {
	BUN = 'bun',
	SAUCE = 'sauce',
	MAIN = 'main',
}

export interface ITab {
	value: TAB;
	label: string;
}

export interface DataInterface {
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
