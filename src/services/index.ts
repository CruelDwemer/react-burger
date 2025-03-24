import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice, IngredientsState } from './ingredients-slice';
import {
	burgerConstructorSlice,
	BurgerState,
} from './burger-constructor-slice';
import { orderSlice, OrderState } from './order-slice';
import {
	ingredientInfoSlice,
	IngredientInfoState,
} from './ingredient-info-slice';
import { userSlice, UserState } from '@services/user-slice';

const rootReducer = combineSlices(
	ingredientsSlice,
	burgerConstructorSlice,
	ingredientInfoSlice,
	orderSlice,
	userSlice
);

export default rootReducer;

export interface Store {
	ingredients: IngredientsState;
	ingredientInfo: IngredientInfoState;
	burger: BurgerState;
	order: OrderState;
	user: UserState;
}

export { ingredientsSlice, getIngredientsQuery } from './ingredients-slice';

export {
	addIngredient,
	removeIngredient,
	sortIngredients,
} from './burger-constructor-slice';

export { orderSlice, sendOrderInfo, flushState } from './order-slice';

export {
	removeIngredientInfo,
	setIngredientInfo,
} from './ingredient-info-slice';
