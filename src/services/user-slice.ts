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
	LoginData,
	ModifiedData,
} from '../api/user';
import { setCookie, getCookie, deleteCookie } from './cookies';

type TLogin = {
	email: string;
	password: string;
};

type TUserData = {
	email: string;
	password: string;
	name: string;
};

type TResponse = {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
};

type TUserInfo = {
	email: string;
	name: string;
};

type TLoginResponse = {
	success: boolean;
	user: TUserInfo;
	accessToken: string;
	refreshToken: string;
};

type TGetUserResponse = {
	success: boolean;
	user: TUserInfo;
};

const loginUser = createAsyncThunk<TLoginResponse, TLogin>(
	'user/loginUser',
	async (data: LoginData) => {
		const result = await login(data as LoginData);
		return result as unknown as TLoginResponse;
	}
);

const registerUser = createAsyncThunk<TResponse, TUserData>(
	'user/registerUser',
	async (data: TUserData) => {
		const result = await register(data as TUserData);
		return result as unknown as TGetUserResponse;
	}
);

const setUser = createAsyncThunk('user/setUser', async () => {
	let token = getCookie('accessToken');
	if (!token) {
		const refreshTokenValue = getCookie('refreshToken');
		const result = await refreshToken(refreshTokenValue ?? '');
		if (result.success) {
			token = result.accessToken;
			setCookie('accessToken', token as string, { path: '/', expires: 1200 });
		}
	}
	const result = await getUserInfo(token ?? '');
	return result as unknown as TGetUserResponse;
});

const modifyUser = createAsyncThunk('user/modifyUser', async (data: ModifiedData) => {
	let token = getCookie('accessToken');
	if (!token) {
		const refreshTokenValue = getCookie('refreshToken');
		const result = await refreshToken(refreshTokenValue ?? '');
		if (result.success) {
			token = result.accessToken;
			setCookie('accessToken', token ?? '', { path: '/', expires: 1200 });
		}
	}

	const result = await changeUserInfo(data as ModifiedData, token ?? '');
	return result as unknown as TGetUserResponse;
});

const logoutUser = createAsyncThunk('user/logoutUser', async () => {
	const token = getCookie('refreshToken');
	const result = await logout(token ?? '');
	return result as unknown as { success: boolean };
});

interface TUser {
	email: string;
	name: string;
}

export interface UserState {
	user: TUser | null;
	isAuth: boolean;
	isAuthChecked: boolean;
	loaded: boolean;
}

const initialState: UserState = {
	user: null,
	isAuth: false,
	isAuthChecked: false,
	loaded: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
		builder.addCase(
			registerUser.fulfilled,
			(state: UserState, action: PayloadAction<TGetUserResponse>) => {
				state.user = action.payload.user;
			}
		);
		builder.addCase(
			loginUser.fulfilled,
			(state: UserState, action: PayloadAction<TLoginResponse>) => {
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
			(state: UserState, action: PayloadAction<TGetUserResponse>) => {
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
		builder.addCase(setUser.rejected, (state: UserState) => {
			state.user = null;
			state.isAuth = false;
			state.isAuthChecked = true;
		});
		builder.addCase(logoutUser.fulfilled, (state: UserState) => {
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
} as CreateSliceOptions<unknown, SliceCaseReducers<unknown>, string, string, SliceSelectors<unknown>>);

export { loginUser, logoutUser, registerUser, setUser, modifyUser, userSlice };
