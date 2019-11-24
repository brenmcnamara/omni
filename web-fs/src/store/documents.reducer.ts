import {
  DocumentContent,
  Model as Document,
  Ref as DocumentRef,
} from './Document.model';
import { PureAction } from './actions';

export interface State {
  documents: { [id: string]: Document };
  documentContents: { [id: string]: DocumentContent };
}

const DEFAULT_STATE: State = {
  documents: {},
  documentContents: {},
};

export default function documents(
  state: State = DEFAULT_STATE,
  action: PureAction,
): State {
  switch (action.type) {
    case 'ADD_DOCUMENT': {
      const { documentContent, document } = action;
      return addDocument(state, document, documentContent);
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
  document: Document,
  documentContent: DocumentContent,
): State {
  return {
    ...state,
    documents: {
      ...state.documents,
      [document.id]: document,
    },
    documentContents: {
      ...state.documentContents,
      [document.id]: documentContent,
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
  if (state.documents[document.id] == undefined) {
    throw Error(`Could not find document for id ${document.id}`);
  }

  return {
    ...state,
    documents: {
      ...state.documents,
      [document.id]: document,
    },
  };
}
