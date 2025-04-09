import React, { useState } from 'react';

const useForm = <T>(
	inputValues: T = {} as T
): {
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setValues: (value: ((prevState: T) => T) | T) => void;
	values: T;
} => {
	const [values, setValues] = useState(inputValues);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setValues({ ...values, [name]: value });
	};

	return { values, handleChange, setValues };
};

export default useForm;
