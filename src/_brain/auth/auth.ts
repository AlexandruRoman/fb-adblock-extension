import { combineReducers, Reducer } from "redux";
import { fork, takeLatest, call, put } from "redux-saga/effects";
import { authGetLicenceFlow, authGetLicenceAliases } from "./_ducks/get-licence";
import { action } from "typesafe-actions";
import { IApplicationState } from "../redux";
import { IAction } from "../_helpers/actions";
import { IAliasIndex, createAlias } from "../_helpers/store";

/*
 *         ___       ______ .___________. __    ______   .__   __.      _______.
 *        /   \     /      ||           ||  |  /  __  \  |  \ |  |     /       |
 *       /  ^  \   |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
 *      /  /_\  \  |  |         |  |     |  | |  |  |  | |  . `  |     \   \
 *     /  _____  \ |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |
 *    /__/     \__\ \______|    |__|     |__|  \______/  |__| \__| |_______/
 */
interface IAuthSetLicenceActionPayload {
  licence: string;
}
type IAuthSetLicenceAction = IAction<IAuthSetLicenceActionPayload>;
type IAuthSetLicenceActionData = IAuthSetLicenceActionPayload;
export const authSetLicenceAction = (data: IAuthSetLicenceActionData) =>
  action<string, IAuthSetLicenceActionPayload>(AUTH_ACTION_TYPES.SET_LICENCE, data);

/*
 *         _______.     ___       _______      ___           _______.
 *        /       |    /   \     /  _____|    /   \         /       |
 *       |   (----`   /  ^  \   |  |  __     /  ^  \       |   (----`
 *        \   \      /  /_\  \  |  | |_ |   /  /_\  \       \   \
 *    .----)   |    /  _____  \ |  |__| |  /  _____  \  .----)   |
 *    |_______/    /__/     \__\ \______| /__/     \__\ |_______/
 */

export default function* authFlow() {
  yield fork(authGetLicenceFlow);
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

export const AUTH_ACTION_TYPES = {
  SET_LICENCE: "AUTH.SET_LICENCE",
  GET_LICENCE: "AUTH.GET_LICENCE"
};

export interface IAuthState {
  licence: string;
}

/*
 *         ___       __       __       ___           _______. _______     _______.
 *        /   \     |  |     |  |     /   \         /       ||   ____|   /       |
 *       /  ^  \    |  |     |  |    /  ^  \       |   (----`|  |__     |   (----`
 *      /  /_\  \   |  |     |  |   /  /_\  \       \   \    |   __|     \   \
 *     /  _____  \  |  `----.|  |  /  _____  \  .----)   |   |  |____.----)   |
 *    /__/     \__\ |_______||__| /__/     \__\ |_______/    |_______|_______/
 *
 */

export const authAliases: IAliasIndex = {
  ...authGetLicenceAliases
};

/*
 *    .______    _______  _______   __    __    ______  _______ .______
 *    |   _  \  |   ____||       \ |  |  |  |  /      ||   ____||   _  \
 *    |  |_)  | |  |__   |  .--.  ||  |  |  | |  ,----'|  |__   |  |_)  |
 *    |      /  |   __|  |  |  |  ||  |  |  | |  |     |   __|  |      /
 *    |  |\  \-.|  |____ |  '--'  ||  `--'  | |  `----.|  |____ |  |\  \-.
 *    | _| `.__||_______||_______/  \______/   \______||_______|| _| `.__|
 */

const initialState: IAuthState = {
  licence: ""
};

export const authReducer: Reducer<IAuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SET_LICENCE: {
      return { ...state, licence: (action.payload as IAuthSetLicenceActionPayload).licence };
    }
    default: {
      return state;
    }
  }
};

/*
 *        ______. _______  __       _______   ______ .___________.  ______   .______      ______.
 *       /      ||   ____||  |     |   ____| /      ||           | /  __  \  |   _  \    /      |
 *      |   (---`|  |__   |  |     |  |__   |  ,----'`---|  |----`|  |  |  | |  |_)  |  |   (---`
 *       \   \   |   __|  |  |     |   __|  |  |         |  |     |  |  |  | |      /    \   \
 *    .---)   |  |  |____ |  `----.|  |____ |  `----.    |  |     |  `--'  | |  |\  \-.---)   |
 *    |______/   |_______||_______||_______| \______|    |__|      \______/  | _| `.__|______/
 */

export const authLicenceSelector = (state: IApplicationState) => state.auth.licence;
