import * as t from 'io-ts';
import {
  Ref as DocumentRef,
  tRef as tDocumentRef,
  tRefSerialize as tDocumentRefSerialize,
} from './Document.model';
import { PureAction } from './actions';

// -----------------------------------------------------------------------------
// EditMode
// -----------------------------------------------------------------------------

interface EditMode {
  documentRef: DocumentRef | undefined;
}

const tEditMode = t.type({
  documentRef: t.union([tDocumentRef, t.undefined]),
});

const tEditModeSerialize = t.type({
  documentRef: t.union([tDocumentRefSerialize, t.undefined]),
});

// -----------------------------------------------------------------------------
// State
// -----------------------------------------------------------------------------

export type State = EditMode;

export const tState = tEditMode;

export const tStateSerialize = tEditModeSerialize;

export const DefaultState: State = { documentRef: undefined };

// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------

export default function editMode(
  state: State = DefaultState,
  action: PureAction,
): State {
  switch (action.type) {
    case 'SELECT_DOCUMENT': {
      return { ...state, documentRef: action.documentRef };
    }

    default:
      return state;
  }
}
