export enum INGREDIENT_TYPE {
	BUN = 'bun',
	SAUCE = 'sauce',
	MAIN = 'main',
}

export interface ITab {
	value: INGREDIENT_TYPE;
	label: string;
}
