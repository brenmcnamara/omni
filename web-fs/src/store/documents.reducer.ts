import * as t from 'io-ts';
import tStringSerialize from './tSerialize/tStringSerialize';

import {
  DocumentContent,
  tSerialize as tDocumentContentSerialize,
} from './DocumentContent';
import {
  Local as DocumentLocal,
  Model as Document,
  Ref as DocumentRef,
  tModelSerialize as tDocumentSerialize,
} from './Document.model';
import { getID } from './core';
import { PureAction } from './actions';

// -----------------------------------------------------------------------------
// State
// -----------------------------------------------------------------------------

export interface State {
  documents: { [id: string]: Document };
  documentContents: { [id: string]: DocumentContent };
  localToPersistedID: { [id: string]: string };
}

export const tStateSerialize = t.type({
  documents: t.dictionary(tStringSerialize, tDocumentSerialize),
  documentContents: t.dictionary(tStringSerialize, tDocumentContentSerialize),
  localToPersistedID: t.dictionary(tStringSerialize, tStringSerialize),
});

const DEFAULT_STATE: State = {
  documents: {},
  documentContents: {},
  localToPersistedID: {},
};

// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------

export default function documents(
  state: State = DEFAULT_STATE,
  action: PureAction,
): State {
  switch (action.type) {
    case 'ADD_DOCUMENT': {
      const { documentContent, documentLocal } = action;
      return addDocument(state, documentLocal, documentContent);
    }

    case 'SET_DOCUMENT': {
      const { document } = action;
      return setDocument(state, document);
    }

    case 'SET_DOCUMENT_CONTENT': {
      const { documentRef, documentContent } = action;
      return setDocumentContent(state, documentRef, documentContent);
    }

    default:
      return state;
  }
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

function addDocument(
  state: State,
  documentLocal: DocumentLocal,
  documentContent: DocumentContent,
): State {
  return {
    ...state,
    documents: {
      ...state.documents,
      [documentLocal.localID]: documentLocal,
    },
    documentContents: {
      ...state.documentContents,
      [documentLocal.localID]: documentContent,
    },
  };
}

function setDocumentContent(
  state: State,
  documentRef: DocumentRef,
  documentContent: DocumentContent,
): State {
  if (state.documentContents[documentRef.refID] === undefined) {
    throw Error(`Could not find document content for id ${documentRef.refID}`);
  }

  return {
    ...state,
    documentContents: {
      ...state.documentContents,
      [documentRef.refID]: documentContent,
    },
  };
}

function setDocument(state: State, document: Document): State {
  const id = getID(document);
  if (state.documents[id] === undefined) {
    throw Error(`Could not find document for id ${id}`);
  }

  return {
    ...state,
    documents: {
      ...state.documents,
      [id]: document,
    },
  };
}
