import { describe, expect, it, beforeEach } from '@jest/globals';
import {
	userSlice,
	initialState,
	registerUser,
	modifyUser,
	setUser,
	logoutUser,
	loginUser,
} from '@services/user-slice';

const userData = {
	email: 'test-email@mail.ru',
	name: 'Test user',
};

describe('User slice tests', () => {
	beforeEach(() => {
		Object.defineProperty(document, 'cookie', {
			writable: true,
			value: '',
		});
	});

	it('Should return initial state', () => {
		const state = userSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('Should proceed register', () => {
		expect(
			userSlice.reducer(initialState, {
				type: registerUser.fulfilled.type,
				payload: { user: userData },
			})
		).toEqual({ ...initialState, user: userData });
	});

	it('Should modify', () => {
		expect(
			userSlice.reducer(initialState, {
				type: modifyUser.fulfilled.type,
				payload: { user: userData },
			})
		).toEqual({ ...initialState, user: userData });
	});

	it('Should set user data if successful response', () => {
		const payload = {
			success: true,
			user: userData,
			accessToken: 'mocked-access-token',
			refreshToken: 'mocked-refresh-token',
		};
		expect(
			userSlice.reducer(initialState, {
				type: setUser.fulfilled.type,
				payload,
			})
		).toEqual({
			...initialState,
			loaded: true,
			user: userData,
			isAuth: true,
			isAuthChecked: true,
		});
	});

	it('Should correctly operate setting user if response failed', () => {
		const payload = {
			success: false,
		};
		expect(
			userSlice.reducer(initialState, {
				type: setUser.fulfilled.type,
				payload,
			})
		).toEqual({
			...initialState,
			loaded: true,
			isAuth: false,
			isAuthChecked: true,
		});
	});

	it('Should correct work if setUser was rejected', () => {
		expect(
			userSlice.reducer(initialState, {
				type: setUser.rejected.type,
			})
		).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});

	it('Should proceed login', () => {
		const payload = {
			success: true,
			user: userData,
			accessToken: 'mocked-access-token',
			refreshToken: 'mocked-refresh-token',
		};
		expect(
			userSlice.reducer(initialState, {
				type: loginUser.fulfilled.type,
				payload,
			})
		).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});

	it('Should proceed logout', () => {
		expect(
			userSlice.reducer(
				{ ...initialState, user: userData, isAuth: true },
				{ type: logoutUser.fulfilled.type }
			)
		).toEqual(initialState);
	});
});
