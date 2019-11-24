import { Action } from './actions';
import { Model as Document, Ref as DocumentRef } from './Document.model';

export type State = EditMode$EditDocument | EditMode$NewDocument;

interface EditMode$NewDocument {
  type: 'NEW_DOCUMENT';
}

interface EditMode$EditDocument {
  documentRef: DocumentRef;
  type: 'EDIT_DOCUMENT';
}

const DEFAULT_STATE: State = { type: 'NEW_DOCUMENT' };

export default function editMode(
  state: State = DEFAULT_STATE,
  action: Action,
): State {
  switch (action.type) {
    case 'ADD_DOCUMENT': {
      return state.type === 'NEW_DOCUMENT'
        ? { documentRef: action.document.createRef(), type: 'EDIT_DOCUMENT' }
        : state;
    }

    default:
      return state;
  }
}
