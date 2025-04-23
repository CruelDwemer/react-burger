import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "FEED_CONNECT">("FEED_CONNECT");
export const wsConnectProfile = createAction<string, "PROFILE_CONNECT">("PROFILE_CONNECT");
export const wsDisconnect = createAction("FEED_DISCONNECT");

export type TWsExternalActions = ReturnType<typeof wsConnect> | ReturnType<typeof wsDisconnect>;
