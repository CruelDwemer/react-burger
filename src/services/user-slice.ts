import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	CreateSliceOptions,
	SliceCaseReducers,
	SliceSelectors,
	ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import {
	login,
	logout,
	register,
	getUserInfo,
	refreshToken,
	changeUserInfo,
} from '../api/user';
import { setCookie, getCookie, deleteCookie } from '@utils/cookies';
import {
	IUserInfoResponse,
	ILoginResponse,
	TRegisterRequestData,
	TLoginRequestData,
	TModifyRequestData,
	IResponseBase,
} from '../api/types';
import { IUserData } from '../types';

type TUserInfo = {
	email: string;
	name: string;
};

type TGetUserResponse = {
	success: boolean;
	user: TUserInfo;
};

const loginUser = createAsyncThunk<ILoginResponse, TLoginRequestData>(
	'user/loginUser',
	async (data) => await login(data)
);

const registerUser = createAsyncThunk<IUserInfoResponse, TRegisterRequestData>(
	'user/registerUser',
	async (data) => await register(data)
);

const setUser = createAsyncThunk<IUserInfoResponse>(
	'user/setUser',
	async () => {
		let token = getCookie('accessToken');
		if (!token) {
			const refreshTokenValue = getCookie('refreshToken');
			const result = await refreshToken(refreshTokenValue ?? '');
			if (result.success) {
				token = result.accessToken;
				setCookie('accessToken', token as string, { path: '/', expires: 1200 });
			}
		}
		return await getUserInfo(token ?? '');
	}
);

const modifyUser = createAsyncThunk<IUserInfoResponse, TModifyRequestData>(
	'user/modifyUser',
	async (data) => {
		let token = getCookie('accessToken');
		if (!token) {
			const refreshTokenValue = getCookie('refreshToken');
			const result = await refreshToken(refreshTokenValue ?? '');
			if (result.success) {
				token = result.accessToken;
				setCookie('accessToken', token ?? '', { path: '/', expires: 1200 });
			}
		}

		return await changeUserInfo(data, token ?? '');
	}
);

const logoutUser = createAsyncThunk<IResponseBase>(
	'user/logoutUser',
	async (): Promise<IResponseBase> => {
		const token = getCookie('refreshToken');
		return (await logout(token ?? '')) as IResponseBase;
	}
);

export interface IUserState {
	user: Pick<IUserData, 'email' | 'name'> | null;
	isAuth: boolean;
	isAuthChecked: boolean;
	loaded: boolean;
}

const initialState: IUserState = {
	user: null,
	isAuth: false,
	isAuthChecked: false,
	loaded: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: (builder: ActionReducerMapBuilder<IUserState>) => {
		builder.addCase(
			registerUser.fulfilled,
			(state: IUserState, action: PayloadAction<TGetUserResponse>) => {
				state.user = action.payload.user;
			}
		);
		builder.addCase(
			loginUser.fulfilled,
			(state: IUserState, action: PayloadAction<ILoginResponse>) => {
				const response = action.payload;
				setCookie('refreshToken', response.refreshToken, {
					path: '/',
					expires: 3600,
				});
				setCookie('accessToken', response.accessToken, {
					path: '/',
					expires: 1200,
				});
				state.isAuthChecked = true;
			}
		);
		builder.addCase(
			setUser.fulfilled,
			(state: IUserState, action: PayloadAction<TGetUserResponse>) => {
				state.loaded = true;
				if (action.payload?.success) {
					state.user = action.payload.user;
					state.isAuth = true;
				} else {
					state.user = null;
					state.isAuth = false;
				}
				state.isAuthChecked = true;
			}
		);
		builder.addCase(setUser.rejected, (state: IUserState) => {
			state.user = null;
			state.isAuth = false;
			state.isAuthChecked = true;
		});
		builder.addCase(logoutUser.fulfilled, (state: IUserState) => {
			state.user = null;
			state.isAuth = false;
			deleteCookie('accessToken');
			deleteCookie('refreshToken');
		});
		builder.addCase(
			modifyUser.fulfilled,
			(state, action: PayloadAction<TGetUserResponse>) => {
				state.user = action.payload.user;
			}
		);
	},
} as CreateSliceOptions<IUserState, SliceCaseReducers<IUserState>, 'user', 'user', SliceSelectors<IUserState>>);

export { loginUser, logoutUser, registerUser, setUser, modifyUser, userSlice };
