import * as t from 'io-ts';
import {
  createRef as createDocumentRef,
  Ref as DocumentRef,
  tRef as tDocumentRef,
} from './Document.model';
import { PureAction } from './actions';

export type State = EditMode$EditDocument | EditMode$NewDocument;

export const tState = t.union([
  t.type({
    type: t.literal('NEW_DOCUMENT'),
  }),
  t.type({
    documentRef: tDocumentRef,
    type: t.literal('EDIT_DOCUMENT'),
  }),
]);

interface EditMode$NewDocument {
  type: 'NEW_DOCUMENT';
}

interface EditMode$EditDocument {
  documentRef: DocumentRef;
  type: 'EDIT_DOCUMENT';
}

export const DefaultState: State = { type: 'NEW_DOCUMENT' };

export default function editMode(
  state: State = DefaultState,
  action: PureAction,
): State {
  switch (action.type) {
    case 'ADD_DOCUMENT': {
      return state.type === 'NEW_DOCUMENT'
        ? {
            documentRef: createDocumentRef(action.documentLocal),
            type: 'EDIT_DOCUMENT',
          }
        : state;
    }

    case 'SET_EDIT_MODE': {
      return action.editMode;
    }

    default:
      return state;
  }
}
