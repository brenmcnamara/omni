import * as t from 'io-ts';
import {
  createRef as createDocumentRef,
  Ref as DocumentRef,
  tRef as tDocumentRef,
  tRefSerialize as tDocumentRefSerialize,
} from './Document.model';
import { PureAction } from './actions';

// -----------------------------------------------------------------------------
// EditMode
// -----------------------------------------------------------------------------

interface EditMode$NewDocument {
  type: 'NEW_DOCUMENT';
}

const tEditMode$NewDocument = t.type({
  type: t.literal('NEW_DOCUMENT'),
});

const tEditModeSerialize$NewDocument = t.type({
  type: t.literal('NEW_DOCUMENT'),
});

interface EditMode$EditDocument {
  documentRef: DocumentRef;
  type: 'EDIT_DOCUMENT';
}

const tEditMode$EditDocument = t.type({
  documentRef: tDocumentRef,
  type: t.literal('EDIT_DOCUMENT'),
});

const tEditModeSerialize$EditDocument = t.type({
  documentRef: tDocumentRefSerialize,
  type: t.literal('EDIT_DOCUMENT'),
});

// -----------------------------------------------------------------------------
// State
// -----------------------------------------------------------------------------

export type State = EditMode$EditDocument | EditMode$NewDocument;

export const tState = t.union([tEditMode$NewDocument, tEditMode$EditDocument]);

export const tStateSerialize = t.union([
  tEditModeSerialize$EditDocument,
  tEditModeSerialize$NewDocument,
]);

export const DefaultState: State = { type: 'NEW_DOCUMENT' };

// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------

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
