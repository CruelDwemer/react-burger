import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice, IIngredientsState } from './ingredients-slice';
import {
	burgerConstructorSlice,
	IBurgerState,
} from './burger-constructor-slice';
import { orderSlice, IOrderState } from './order-slice';
import {
	ingredientInfoSlice,
	IIngredientInfoState,
} from './ingredient-info-slice';
import { userSlice, IUserState } from '@services/user-slice';
import { useDispatch, useSelector, useStore } from 'react-redux';

const rootReducer = combineSlices(
	ingredientsSlice,
	burgerConstructorSlice,
	ingredientInfoSlice,
	orderSlice,
	userSlice
);

export interface IStore {
	ingredients: IIngredientsState;
	ingredientInfo: IIngredientInfoState;
	burger: IBurgerState;
	order: IOrderState;
	user: IUserState;
}

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	devTools: true,
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

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
