import { createAction } from '@reduxjs/toolkit';

enum WsActions {
	FEED_CONNECT = 'FEED_CONNECT',
	PROFILE_CONNECT = 'PROFILE_CONNECT',
	FEED_DISCONNECT = 'FEED_DISCONNECT',
}

export const wsConnect = createAction<string, WsActions.FEED_CONNECT>(
	WsActions.FEED_CONNECT
);
export const wsConnectProfile = createAction<string, WsActions.PROFILE_CONNECT>(
	WsActions.PROFILE_CONNECT
);
export const wsDisconnect = createAction(WsActions.FEED_DISCONNECT);

export type TWsExternalActions =
	| ReturnType<typeof wsConnect>
	| ReturnType<typeof wsDisconnect>;
