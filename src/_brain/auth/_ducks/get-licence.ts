import { action } from "typesafe-actions";
import { takeLatest, call, put, take } from "redux-saga/effects";
import { IAction } from "../../_helpers/actions";
import { api } from "../../_helpers/api";
import { authSetLicenceAction } from "../auth";
import { IAliasIndex, createAlias } from "../../_helpers/store";

/*
 *         ___       ______ .___________. __    ______   .__   __.      _______.
 *        /   \     /      ||           ||  |  /  __  \  |  \ |  |     /       |
 *       /  ^  \   |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
 *      /  /_\  \  |  |         |  |     |  | |  |  |  | |  . `  |     \   \
 *     /  _____  \ |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |
 *    /__/     \__\ \______|    |__|     |__|  \______/  |__| \__| |_______/
 */

interface IAuthGetLicenceStartActionPayload {
  email: string;
  password: string;
}
export type IAuthGetLicenceStartAction = IAction<IAuthGetLicenceStartActionPayload>;
export type IAuthGetLicenceStartActionData = IAuthGetLicenceStartActionPayload;
export const authGetLicenceStartAction = (data: IAuthGetLicenceStartActionData) =>
  action<string, IAuthGetLicenceStartActionPayload>(AUTH_GET_LICENCE_ACTION_TYPES.START, data);

interface IAuthGetLicenceSuccessActionPayload {}
export type IAuthGetLicenceSuccessAction = IAction<IAuthGetLicenceSuccessActionPayload>;
export type IAuthGetLicenceSuccessActionData = IAuthGetLicenceSuccessActionPayload;
export const authGetLicenceSuccessAction = (data: IAuthGetLicenceSuccessActionData) =>
  action<string, IAuthGetLicenceSuccessActionPayload>(AUTH_GET_LICENCE_ACTION_TYPES.SUCCESS, data);
/*
 *         _______.     ___       _______      ___           _______.
 *        /       |    /   \     /  _____|    /   \         /       |
 *       |   (----`   /  ^  \   |  |  __     /  ^  \       |   (----`
 *        \   \      /  /_\  \  |  | |_ |   /  /_\  \       \   \
 *    .----)   |    /  _____  \ |  |__| |  /  _____  \  .----)   |
 *    |_______/    /__/     \__\ \______| /__/     \__\ |_______/
 */

export function* authGetLicenceFlow() {
  try {
    yield takeLatest(AUTH_GET_LICENCE_ACTION_TYPES.START, authGetLicenceSaga);
  } catch (error) {
    console.log(error);
  }
}

function* authGetLicenceSaga(action: IAuthGetLicenceStartAction) {
  try {
    const response = yield call(authGetLicenceApi, {
      email: action.payload.email,
      password: action.payload.password
    });
    yield put(authSetLicenceAction({ licence: response.data }));
    yield put(authGetLicenceSuccessAction({}));
  } catch (error) {
    console.log(error);
    yield put({ type: AUTH_GET_LICENCE_ACTION_TYPES.ERROR, payload: error });
  }
}

/*
 *         ___      .______    __
 *        /   \     |   _  \  |  |
 *       /  ^  \    |  |_)  | |  |
 *      /  /_\  \   |   ___/  |  |
 *     /  _____  \  |  |      |  |
 *    /__/     \__\ | _|      |__|
 */

interface IAuthGetLicenceApi {
  email: string;
  password: string;
}
function authGetLicenceApi(data: IAuthGetLicenceApi) {
  return api.post("auth/get-licence", data);
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

export const AUTH_GET_LICENCE_ACTION_TYPES = {
  START: "GET_LICENCE.START",
  SUCCESS: "GET_LICENCE.SUCCESS",
  ERROR: "GET_LICENCE.ERROR"
};

/*
 *         ___       __       __       ___           _______. _______     _______.
 *        /   \     |  |     |  |     /   \         /       ||   ____|   /       |
 *       /  ^  \    |  |     |  |    /  ^  \       |   (----`|  |__     |   (----`
 *      /  /_\  \   |  |     |  |   /  /_\  \       \   \    |   __|     \   \
 *     /  _____  \  |  `----.|  |  /  _____  \  .----)   |   |  |____.----)   |
 *    /__/     \__\ |_______||__| /__/     \__\ |_______/    |_______|_______/
 *
 */

export const authGetLicenceAliases: IAliasIndex = {
  [AUTH_GET_LICENCE_ACTION_TYPES.START]: createAlias(authGetLicenceStartAction)
};
