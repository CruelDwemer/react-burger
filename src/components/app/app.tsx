import * as React from 'react';
import { useEffect } from 'react';
import AppHeader from '../app-header';
import { Provider, useDispatch } from 'react-redux';
import { AnyAction, Store, Action } from '@reduxjs/toolkit';
import store, { getIngredientsQuery, IStore } from '@services/index';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
	useLocation,
} from 'react-router-dom';
import MainPage from '@pages/main';
import LoginPage from '@pages/login';
import RegisterPage from '@pages/register';
import ResetPasswordPage from '@pages/reset-password';
import ForgotPassword from '@pages/forgot-password';
import Profile from '@pages/profile';
import IngredientPage from '@pages/ingredient';
import Modal from '../modal';
import IngredientDetails from '../burger-ingredients/components/ingredient-details';
import { setUser } from '@services/user-slice';
import { OnlyAuth, OnlyUnAuth } from '../protected';

const App = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const background = location.state && location.state.background;

	useEffect(() => {
		dispatch(setUser() as unknown as AnyAction);
		dispatch(getIngredientsQuery() as unknown as AnyAction);
	}, [dispatch]);

	const closeIngredientDetailsModal = () => {
		navigate(-1);
	};

	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' Component={MainPage} />
				<Route path='/login' element={<OnlyUnAuth Component={LoginPage} />} />
				<Route
					path='/register'
					element={<OnlyUnAuth Component={RegisterPage} />}
				/>
				<Route
					path='/forgot-password'
					element={<OnlyUnAuth Component={ForgotPassword} />}
				/>
				<Route
					path='/reset-password'
					element={<OnlyUnAuth Component={ResetPasswordPage} />}
				/>
				<Route path='/profile' element={<OnlyAuth Component={Profile} />} />
				<Route
					path='/ingredients/:id'
					element={
						<IngredientPage>
							<IngredientDetails centeredHeader />
						</IngredientPage>
					}
				/>
			</Routes>
			{background && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal closeModal={closeIngredientDetailsModal}>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
};

const AppWithProvider = (): React.JSX.Element => (
	<Provider store={store as unknown as Store<IStore, Action<string>>}>
		<Router>
			<App />
		</Router>
	</Provider>
);

export default AppWithProvider;
