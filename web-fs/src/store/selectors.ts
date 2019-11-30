import { DocumentContent } from './DocumentContent';
import { Model as Document, Ref as DocumentRef } from './Document.model';
import { StoreState } from './Store';
import { getThemeInfoMap, ThemeInfo } from '../theme';

export function getDocument(
  state: StoreState,
  ref: DocumentRef,
): Document | undefined {
  const { documents, localToPersistedID } = state.documents;

  if (documents[ref.refID]) {
    return documents[ref.refID];
  }

  if (localToPersistedID[ref.refID]) {
    return documents[localToPersistedID[ref.refID]];
  }

  return undefined;
}

export function getDocumentContent(
  state: StoreState,
  ref: DocumentRef,
): DocumentContent | undefined {
  const { documentContents, localToPersistedID } = state.documents;

  if (documentContents[ref.refID]) {
    return documentContents[ref.refID];
  }

  if (localToPersistedID[ref.refID]) {
    return documentContents[localToPersistedID[ref.refID]];
  }

  return undefined;
}

export function getThemeInfo(state: StoreState): ThemeInfo {
  return getThemeInfoMap()[state.configuration.themeType];
}
