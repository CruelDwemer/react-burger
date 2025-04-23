import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import type { RootState } from './types';

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

// @ts-ignore
export const socketMiddleware = <R, S>(
	wsActions: TWsActionTypes<R, S>,
	withTokenRefresh: boolean = false
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
						dispatch(onMessage(parsedData));
					} catch (err) {
						dispatch(onError((err as Error).message));
					}
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());
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
				isConnected = false;
				socket.close();
				socket = null;
			}

			next(action);
		};
	};
};
