const checkResponse = (response: Response) => {
	if (!response.ok) {
		return Promise.reject(`Ошибка ${response.status}`);
	}
	return response;
};

export default checkResponse;
