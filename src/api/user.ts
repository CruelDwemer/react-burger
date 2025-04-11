import request from './request';
import {
	ILoginResponse,
	IRefreshTokenResponse,
	TRegisterRequestData,
	IResponseBase,
	IUserInfoResponse,
	TEmail,
	TLoginRequestData,
	TModifyRequestData,
} from './types';

export type PasswordReset = {
	password: string;
	token: string;
};

const register = async (
	data: TRegisterRequestData
): Promise<IUserInfoResponse> =>
	await request<IUserInfoResponse>('auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

const login = async (data: TLoginRequestData): Promise<ILoginResponse> =>
	await request<ILoginResponse>('auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

const getUserInfo = async (token: string): Promise<IUserInfoResponse> =>
	await request<IUserInfoResponse>('auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
	});

const changeUserInfo = async (
	data: TModifyRequestData,
	token: string
): Promise<IUserInfoResponse> =>
	await request<IUserInfoResponse>('auth/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify(data),
	});

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> =>
	await request<IRefreshTokenResponse>('auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: `${token}` }),
	});

const resetPassword = async (data: TEmail): Promise<IResponseBase> =>
	await request<IResponseBase>('password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

const setNewPassword = async (data: PasswordReset): Promise<IResponseBase> =>
	await request<IResponseBase>('password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

const logout = async (token: string): Promise<IResponseBase> =>
	await request<IResponseBase>('auth/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: `${token}` }),
	});

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
