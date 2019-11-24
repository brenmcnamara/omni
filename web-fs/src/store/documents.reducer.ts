import { Action } from './actions';
import { LocalRaw as DocumentContentLocalRaw } from './DocumentContent.model';
import { LocalRaw as DocumentLocalRaw } from './Document.model';

export interface State {
  documents: { [id: string]: DocumentLocalRaw };
  documentContents: { [id: string]: DocumentContentLocalRaw };
}

const DEFAULT_STATE: State = {
  documents: {},
  documentContents: {},
};

export default function documents(
  state: State = DEFAULT_STATE,
  action: Action,
): State {
  switch (action.type) {
    case 'CREATE_DOCUMENT': {
      const { documentContentLocal, documentLocal } = action;
      return addDocument(state, documentLocal, documentContentLocal);
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
  document: DocumentLocalRaw,
  documentContent: DocumentContentLocalRaw,
): State {
  return {
    ...state,
    documents: {
      ...state.documents,
      [document.localID]: document,
    },
    documentContents: {
      ...state.documentContents,
      [documentContent.localID]: documentContent,
    },
  };
}
