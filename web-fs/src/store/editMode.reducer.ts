import { Action } from './actions';

export type State = EditMode$EditDocument | EditMode$NewDocument;

interface EditMode$NewDocument {
  type: 'NEW_DOCUMENT';
}

interface EditMode$EditDocument {
  type: 'EDIT_DOCUMENT';
}

const DEFAULT_STATE: State = { type: 'NEW_DOCUMENT' };

export default function editMode(
  state: State = DEFAULT_STATE,
  action: Action,
): State {
  switch (action) {
    default:
      return state;
  }
}
