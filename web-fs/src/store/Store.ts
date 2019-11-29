import * as t from 'io-ts';

import docTree, {
  State as State$DocTree,
  tStateSerialize as tStateSerialize$DocTree,
} from './docTree.reducer';
import documents, {
  State as State$Documents,
  tStateSerialize as tStateSerialize$Documents,
} from './documents.reducer';
import editMode, {
  State as State$EditMode,
  tStateSerialize as tStateSerialize$EditMode,
} from './editMode.reducer';
import thunk, { ThunkAction as _ThunkAction } from 'redux-thunk';

import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware as _Middleware,
} from 'redux';
import { createMiddleware as createLocalStorageMiddleware } from './localStorage.middleware';
import { PureAction } from './actions';

const rootReducer = combineReducers({
  documents,
  docTree,
  editMode,
});

export type PureAction = PureAction;

export type ThunkAction<A extends PureAction> = _ThunkAction<
  void,
  StoreState,
  null,
  A
>;

export type Action = PureAction | ThunkAction<PureAction>;

export type PureDispatch = (action: PureAction) => PureAction;

export type Dispatch = (action: Action) => Action;

export interface StoreState {
  docTree: State$DocTree;
  documents: State$Documents;
  editMode: State$EditMode;
}

export const tStoreStateSerialize = t.type({
  docTree: tStateSerialize$DocTree,
  documents: tStateSerialize$Documents,
  editMode: tStateSerialize$EditMode,
});

export type Middleware = _Middleware<{}, StoreState>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, createLocalStorageMiddleware())),
);
