import store from '@services/index';

// @ts-ignore
export type AppStore = typeof store;
// @ts-ignore
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
