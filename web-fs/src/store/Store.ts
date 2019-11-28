import docTree, { State as State$DocTree } from './docTree.reducer';
import documents, { State as State$Documents } from './documents.reducer';
import editMode, { State as State$EditMode } from './editMode.reducer';
import thunk, { ThunkAction as _ThunkAction } from 'redux-thunk';

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
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

export type PureDispatch = (action: PureAction) => void;

export type Dispatch = (action: Action) => void;

export interface StoreState {
  docTree: State$DocTree;
  documents: State$Documents;
  editMode: State$EditMode;
}

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
