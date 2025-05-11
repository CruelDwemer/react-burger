import * as React from 'react';
import { useEffect } from 'react';
import AppHeader from '../app-header';
import { Provider } from 'react-redux';
import store, { getIngredientsQuery, useAppDispatch } from '@services/index';
import {
	HashRouter as Router,
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
import Feed from '@pages/feed';
import OrderInfo from '../order-info';

const App = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const background = location.state && location.state.background;

	useEffect(() => {
		dispatch(setUser());
		dispatch(getIngredientsQuery());
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
					path='/profile/orders'
					element={<OnlyAuth Component={Profile} />}
				/>
				<Route path='/profile/orders/:id' element={<OrderInfo />} />
				<Route
					path='/ingredients/:id'
					element={
						<IngredientPage>
							<IngredientDetails centeredHeader />
						</IngredientPage>
					}
				/>
				<Route path='/feed' Component={Feed} />
				<Route path='/feed/:id' Component={OrderInfo} />
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
					<Route
						path='/feed/:id'
						element={
							<Modal closeModal={closeIngredientDetailsModal}>
								<OrderInfo />
							</Modal>
						}
					/>
					<Route
						path='/profile/orders/:id'
						element={
							<Modal closeModal={closeIngredientDetailsModal}>
								<OrderInfo />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
};

const AppWithProvider = (): React.JSX.Element => (
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);

export default AppWithProvider;
