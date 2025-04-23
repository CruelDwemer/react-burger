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
import { feedSlice, FeedState } from '@services/feed-slice';
import {
	websocketSlice,
	WebsocketStore,
	wsClose,
	wsConnecting,
	wsError,
	wsMessage,
	wsOpen,
} from '@services/websocket-slice';
import { socketMiddleware } from '@services/middleware';
import { wsConnect, wsConnectProfile, wsDisconnect } from '@services/actions';
import { AppDispatch, AppStore, RootState } from '@services/types';

const rootReducer = combineSlices(
	ingredientsSlice,
	burgerConstructorSlice,
	ingredientInfoSlice,
	orderSlice,
	userSlice,
	feedSlice,
	websocketSlice
);

export interface IStore {
	ingredients: IIngredientsState;
	ingredientInfo: IIngredientInfoState;
	burger: IBurgerState;
	order: IOrderState;
	user: IUserState;
	feed: FeedState;
	websocket: WebsocketStore;
}

const liveTableMiddleware = socketMiddleware({
	connect: wsConnect,
	disconnect: wsDisconnect,
	onConnecting: wsConnecting,
	onOpen: wsOpen,
	onClose: wsClose,
	onError: wsError,
	onMessage: wsMessage,
});

const liveTableMiddlewareProfile = socketMiddleware({
	connect: wsConnectProfile,
	disconnect: wsDisconnect,
	onConnecting: wsConnecting,
	onOpen: wsOpen,
	onClose: wsClose,
	onError: wsError,
	onMessage: wsMessage,
});

const store: any = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(liveTableMiddleware, liveTableMiddlewareProfile),
	devTools: true,
});

// @ts-ignore
export default store;

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
