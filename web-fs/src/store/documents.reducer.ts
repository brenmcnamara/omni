import { DocumentContent, Model as Document } from './Document.model';
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
