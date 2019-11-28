import docTree, { State as State$DocTree } from './docTree.reducer';
import documents, { State as State$Documents } from './documents.reducer';
import editMode, { State as State$EditMode } from './editMode.reducer';
import thunk from 'redux-thunk';

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { PureAction } from './actions';

const rootReducer = combineReducers({
  documents,
  docTree,
  editMode,
});

export type Dispatch = (action: PureAction) => void;

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
