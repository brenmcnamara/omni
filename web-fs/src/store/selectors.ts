import { DocumentContent } from './DocumentContent';
import { matchesRef } from './core';
import { Model as Document, Ref as DocumentRef } from './Document.model';
import { StoreState } from './Store';

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

export function getSelectedNodeIDs(state: StoreState): string[] {
  const { documentRef } = state.editMode;
  const document = documentRef && getDocument(state, documentRef);

  if (document === undefined) {
    return [];
  }

  const selectedNodeIDs: string[] = [];
  for (const node of Object.values(state.docTree.tree)) {
    if (node.type === 'ATOMIC' && matchesRef(document, node.documentRef)) {
      selectedNodeIDs.push(node.id);
    }
  }
  return selectedNodeIDs;
}
