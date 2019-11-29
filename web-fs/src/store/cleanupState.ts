import { DefaultState as DefaultEditMode } from './editMode.reducer';
import { getDocument, getDocumentContent } from './selectors';
import { StoreState } from './Store';

// This function will ensure that the state makes logical sense (no dangling
// references) and will clean out parts of the state if it doesn't.
export default function cleanupState(state: StoreState): StoreState {
  let { editMode } = state;

  if (
    editMode.type === 'EDIT_DOCUMENT' &&
    !getDocument(state, editMode.documentRef)
  ) {
    editMode = DefaultEditMode;
  }

  // TODO: Make sure that every document has a corresponding document content
  // and vice versa.

  if (editMode !== state.editMode) {
    return { ...state, editMode };
  }

  return state;
}
