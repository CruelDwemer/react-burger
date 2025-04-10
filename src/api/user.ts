import request from './request';

export type UserData = {
	email: string;
	password: string;
	name: string;
};

export type ModifiedData = {
	name: string;
	login: string;
	password: string;
};

export type LoginData = Omit<UserData, 'name'>;
export type Email = Pick<UserData, 'email'>;
export type PasswordReset = {
	password: string;
	token: string;
};

const register = async (data: UserData) => {
	return await request('auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((result) => result.json());
};

const login = async (data: LoginData) => {
	return await request('auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((result) => result.json());
};

const getUserInfo = async (token: string) => {
	return await request('auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
	}).then((result) => result.json());
};

const changeUserInfo = async (data: ModifiedData, token: string) => {
	return await request('auth/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify(data),
	}).then((result) => result.json());
};

const refreshToken = async (token: string) => {
	const response = await request('auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: `${token}` }),
	}).then((result) => result.json());
	return response as unknown as Promise<{
		accessToken: string;
		success: boolean;
	}>;
};

const resetPassword = async (data: Email) => {
	const response = await request('password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((result) => result.json());
	return response as unknown as Promise<{
		success: boolean;
	}>;
};

const setNewPassword = async (data: PasswordReset) => {
	return await request('password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((response) => response.json());
};

const logout = async (token: string) => {
	return await request('auth/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: `${token}` }),
	}).then((result) => result.json());
};

export {
	register,
	login,
	logout,
	getUserInfo,
	refreshToken,
	resetPassword,
	setNewPassword,
	changeUserInfo,
};
