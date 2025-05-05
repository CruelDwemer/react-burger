import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { refreshToken } from '../../api/user';
import { getCookie } from '@utils/cookies';

export type TWsActionTypes<R, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<R>;
	sendMessage?: ActionCreatorWithPayload<S>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
	wsActions: TWsActionTypes<R, S>,
	withTokenRefresh = false
): Middleware<Record<string, never>, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const {
			connect,
			disconnect,
			onConnecting,
			onOpen,
			onClose,
			onError,
			onMessage,
			sendMessage,
		} = wsActions;
		let isConnected = false;
		let url = '';
		let reconnectTimer = 0;

		return (next) => (action) => {
			const { dispatch } = store;

			if (connect.match(action)) {
				url = action.payload;
				socket = new WebSocket(action.payload);
				onConnecting && dispatch(onConnecting());
				isConnected = true;

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				socket.onerror = () => {
					dispatch(onError('Error'));
				};

				socket.onmessage = (event) => {
					const { data } = event;

					try {
						const parsedData = JSON.parse(data);

						if (
							withTokenRefresh &&
							parsedData.message === 'Invalid or missing token'
						) {
							const token = getCookie('refreshToken') || '';
							refreshToken(token)
								.then((refreshedData) => {
									const wssUrl = new URL(url);
									wssUrl.searchParams.set(
										'token',
										refreshedData.accessToken.replace('Bearer ', '')
									);
									dispatch(connect(wssUrl.toString()));
								})
								.catch((error) => dispatch(onError(error.message)));
							dispatch(disconnect());
							return;
						}
						dispatch(onMessage(parsedData));
					} catch (err) {
						dispatch(onError((err as Error).message));
					}
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());

					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PERIOD);
					}
				};
			}

			if (socket && sendMessage?.match(action)) {
				try {
					socket.send(JSON.stringify(action.payload));
				} catch (err) {
					dispatch(onError((err as Error).message));
				}
			}

			if (socket && disconnect.match(action)) {
				clearTimeout(reconnectTimer);
				isConnected = false;
				reconnectTimer = 0;
				socket.close();
				socket = null;
			}

			next(action);
		};
	};
};
