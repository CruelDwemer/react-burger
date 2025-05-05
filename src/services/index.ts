import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients-slice';
import { burgerConstructorSlice } from './burger-constructor-slice';
import { orderSlice } from './order-slice';
import { ingredientInfoSlice } from './ingredient-info-slice';
import { userSlice } from '@services/user-slice';
import { useDispatch, useSelector } from 'react-redux';
import { feedSlice } from '@services/feed-slice';
import {
	websocketSlice,
	wsClose,
	wsConnecting,
	wsError,
	wsMessage,
	wsOpen,
} from '@services/websocket-slice';
import { socketMiddleware } from '@services/middlewares/socket-middleware';
import {
	wsConnect,
	wsConnectProfile,
	wsDisconnect,
} from '@services/actions/websocket-actions';

const rootReducer = combineSlices(
	ingredientsSlice,
	burgerConstructorSlice,
	ingredientInfoSlice,
	orderSlice,
	userSlice,
	feedSlice,
	websocketSlice
);

const feedMiddleware = socketMiddleware({
	connect: wsConnect,
	disconnect: wsDisconnect,
	onConnecting: wsConnecting,
	onOpen: wsOpen,
	onClose: wsClose,
	onError: wsError,
	onMessage: wsMessage,
});

const feedMiddlewareProfile = socketMiddleware(
	{
		connect: wsConnectProfile,
		disconnect: wsDisconnect,
		onConnecting: wsConnecting,
		onOpen: wsOpen,
		onClose: wsClose,
		onError: wsError,
		onMessage: wsMessage,
	},
	true
);

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(feedMiddleware, feedMiddlewareProfile),
	devTools: true,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

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
