import docTree, { State as State$DocTree } from './docTree.reducer';
import editMode, { State as State$EditMode } from './editMode.reducer';

import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
  docTree,
  editMode,
});

export interface State {
  docTree: State$DocTree;
  editState: State$EditMode;
}

export default createStore(rootReducer);
