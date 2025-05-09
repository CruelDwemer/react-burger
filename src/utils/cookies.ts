import { refreshToken } from '../api/user';

type TSetCookieProps = {
	path?: string;
	expires?: number | string;
	[key: string]: unknown;
};

const setCookie = (
	name: string,
	value: string,
	props?: TSetCookieProps
): void => {
	props = props || {};
	let exp: Date | undefined;
	if (typeof props.expires === 'number' && props.expires) {
		const d = new Date();
		d.setTime(d.getTime() + props.expires * 1000);
		exp = d;
	}
	if (exp && (exp as Date).toUTCString) {
		props.expires = (exp as Date).toUTCString();
	}
	value = encodeURIComponent(value);
	let updatedCookie = name + '=' + value;
	for (const propName in props) {
		updatedCookie += '; ' + propName;
		const propValue = props[propName];
		if (propValue !== true) {
			updatedCookie += '=' + propValue;
		}
	}
	document.cookie = updatedCookie;
};

const getCookie = (name: string): string | undefined => {
	const matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' +
				name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
				'=([^;]*)'
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
};

const deleteCookie = (name: string): void => {
	setCookie(name, '', { expires: -1 });
};

const getToken = async () => {
	let token: string | undefined;
	try {
		token = getCookie('accessToken');
		if (!token) {
			const refreshTokenValue = getCookie('refreshToken') as string;
			const result = await refreshToken(refreshTokenValue);
			if (result.success) {
				token = result.accessToken as string;
				setCookie('accessToken', token, { path: '/', expires: 1200 });
			}
		}
	} catch (err) {
		throw new Error(`Error: ${err}`);
	}
	return token;
};

const getWebsocketToken = async () => {
	const token = await getToken();
	return token ? token.replace('Bearer ', '') : undefined;
};

export { setCookie, getCookie, deleteCookie, getToken, getWebsocketToken };
