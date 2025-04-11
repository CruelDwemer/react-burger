import { BASE_URL } from '@utils/constants';
import checkResponse from '@utils/checkResponse';

const request = <T>(endpoint: string, options?: RequestInit): Promise<T> =>
	fetch(`${BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then((result) => result.json());

export default request;
