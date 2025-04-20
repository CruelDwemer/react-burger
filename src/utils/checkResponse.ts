const checkResponse = (response: Response): Response | Promise<never> => {
	if (!response.ok) {
		return Promise.reject(`Ошибка ${response.status}`);
	}
	return response;
};

export default checkResponse;
