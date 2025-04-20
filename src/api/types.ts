import { IIngredientData, IUserData } from '../types';

export interface IResponseBase {
	success: boolean;
}

export interface IUserInfoResponse extends IResponseBase {
	user: Pick<IUserData, 'email' | 'name'>;
}

export interface ILoginResponse extends IResponseBase {
	user: Pick<IUserData, 'email' | 'name'>;
	accessToken: string;
	refreshToken: string;
}

export interface IRefreshTokenResponse extends IResponseBase {
	accessToken: string;
}

export type TEmail = Pick<IUserData, 'email'>;

export interface IGetIngredientsResponse extends IResponseBase {
	data: IIngredientData[];
}

export interface ISendOrderRequestData {
	ingredients: Array<IIngredientData['_id']>;
}

export interface ISendOrderResponseData extends IResponseBase {
	name?: string;
	order?: {
		number: number;
	};
}

export type TRegisterRequestData = Pick<
	IUserData,
	'name' | 'email' | 'password'
>;

export type TLoginRequestData = Pick<IUserData, 'email' | 'password'>;

export type TModifyRequestData = Pick<IUserData, 'name' | 'login' | 'password'>;
