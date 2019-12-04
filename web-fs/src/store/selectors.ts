import { createSelector } from 'reselect';
import { DocTree } from './docTree.reducer';
import { matchesRef } from './core';
import { Model as Document, Ref as DocumentRef } from './Document.model';
import { State as State$Documents } from './documents.reducer';
import { StoreState } from './Store';

export const selectDocument = createSelector(
  (state: StoreState, _: DocumentRef) => state.documents,
  (_: StoreState, ref: DocumentRef) => ref,
  (documentsState: State$Documents, ref: DocumentRef) => {
    const { documents, localToPersistedID } = documentsState;

    if (documents[ref.refID]) {
      return documents[ref.refID];
    }

    if (localToPersistedID[ref.refID]) {
      return documents[localToPersistedID[ref.refID]];
    }

    return undefined;
  },
);

export const selectDocumentContent = createSelector(
  (state: StoreState, _: DocumentRef) => state.documents,
  (_: StoreState, ref: DocumentRef) => ref,
  (documentsState: State$Documents, ref: DocumentRef) => {
    const { documentContents, localToPersistedID } = documentsState;

    if (documentContents[ref.refID] !== undefined) {
      return documentContents[ref.refID];
    }

    if (localToPersistedID[ref.refID]) {
      return documentContents[localToPersistedID[ref.refID]];
    }

    return undefined;
  },
);

export const selectActiveDocument = createSelector(
  (state: StoreState) => state.editMode.documentRef,
  (state: StoreState) => state.documents,
  (ref: DocumentRef | undefined, documentsState: State$Documents) => {
    if (ref === undefined) {
      return undefined;
    }

    const { documents, localToPersistedID } = documentsState;

    if (documents[ref.refID] !== undefined) {
      return documents[ref.refID];
    }

    if (localToPersistedID[ref.refID]) {
      return documents[localToPersistedID[ref.refID]];
    }

    return undefined;
  },
);

export const selectActiveDocumentContents = createSelector(
  (state: StoreState) => state.editMode.documentRef,
  (state: StoreState) => state.documents,
  (ref: DocumentRef | undefined, documentsState: State$Documents) => {
    if (ref === undefined) {
      return undefined;
    }

    const { documentContents, localToPersistedID } = documentsState;

    if (documentContents[ref.refID] !== undefined) {
      return documentContents[ref.refID];
    }

    if (localToPersistedID[ref.refID]) {
      return documentContents[localToPersistedID[ref.refID]];
    }

    return undefined;
  },
);

export const selectActiveNodeIDs = createSelector(
  selectActiveDocument,
  (state: StoreState) => state.docTree.tree,
  (document: Document | undefined, tree: { [nodeID: string]: DocTree }) => {
    if (document === undefined) {
      return [];
    }

    const activeIDs: string[] = [];
    for (const node of Object.values(tree)) {
      if (node.type === 'ATOMIC' && matchesRef(document, node.documentRef)) {
        activeIDs.push(node.id);
      }
    }

    return activeIDs;
  },
);
