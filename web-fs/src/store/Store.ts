import docTree, { State as State$DocTree } from './docTree.reducer';
import documents, { State as State$Documents } from './documents.reducer';
import editMode, { State as State$EditMode } from './editMode.reducer';

import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
  documents,
  docTree,
  editMode,
});

export interface StoreState {
  docTree: State$DocTree;
  documents: State$Documents;
  editMode: State$EditMode;
}

export default createStore(
  rootReducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
