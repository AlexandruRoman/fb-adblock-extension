import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { fork, all } from "redux-saga/effects";
import authFlow, { IAuthState, authReducer, authAliases } from "./auth/auth";
import { alias, wrapStore } from "webext-redux";
import { IAliasIndex } from "./_helpers/store";
/*
 *    .______    _______  _______   __    __    ______  _______ .______
 *    |   _  \  |   ____||       \ |  |  |  |  /      ||   ____||   _  \
 *    |  |_)  | |  |__   |  .--.  ||  |  |  | |  ,----'|  |__   |  |_)  |
 *    |      /  |   __|  |  |  |  ||  |  |  | |  |     |   __|  |      /
 *    |  |\  \-.|  |____ |  '--'  ||  `--'  | |  `----.|  |____ |  |\  \-.
 *    | _| `.__||_______||_______/  \______/   \______||_______|| _| `.__|
 */

export interface IApplicationState {
  readonly auth: IAuthState;
}

const rootReducer = combineReducers<IApplicationState>({
  auth: authReducer
});

/*
 *         _______.     ___       _______      ___           _______.
 *        /       |    /   \     /  _____|    /   \         /       |
 *       |   (----`   /  ^  \   |  |  __     /  ^  \       |   (----`
 *        \   \      /  /_\  \  |  | |_ |   /  /_\  \       \   \
 *    .----)   |    /  _____  \ |  |__| |  /  _____  \  .----)   |
 *    |_______/    /__/     \__\ \______| /__/     \__\ |_______/
 */

export function* sagas(): any {
  yield all([fork(authFlow)]);
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

const rootAliases: IAliasIndex = {
  ...authAliases
};

/*
 *    .______     ______     ______   .___________. __    __  .______
 *    |   _  \   /  __  \   /  __  \  |           ||  |  |  | |   _  \
 *    |  |_)  | |  |  |  | |  |  |  | `---|  |----`|  |  |  | |  |_)  |
 *    |   _  <  |  |  |  | |  |  |  |     |  |     |  |  |  | |   ___/
 *    |  |_)  | |  `--'  | |  `--'  |     |  |     |  `--'  | |  |
 *    |______/   \______/   \______/      |__|      \______/  | _|
 */

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const composeMiddlewares = applyMiddleware(alias(rootAliases), sagaMiddleware);
  const store = createStore(rootReducer, {}, compose(composeMiddlewares));
  sagaMiddleware.run(sagas);
  wrapStore(store);
  return store;
};

export { configureStore };
