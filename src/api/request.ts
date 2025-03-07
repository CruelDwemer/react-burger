import { BASE_URL } from '@utils/constants';
import checkResponse from '@utils/checkResponse';

const request = (endpoint: string, options?: RequestInit) => {
	return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};

export default request;
