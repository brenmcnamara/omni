import * as t from 'io-ts';
import nullthrows from 'nullthrows';
import tStringSerialize from './tSerialize/tStringSerialize';

import {
  createRef as createDocumentRef,
  Model as Document,
  Ref as DocumentRef,
  tRefSerialize as tDocumentRefSerialize,
} from './Document.model';
import { matchesRef } from './core';
import { PureAction } from './actions';

export type DocTree = DocTree$Atomic | DocTree$Composite;

interface DocTree$Atomic {
  documentRef: DocumentRef;
  id: string;
  name: string;
  path: string;
  parentID: string | undefined;
  type: 'ATOMIC';
}

interface DocTree$Composite {
  id: string;
  name: string;
  orderedChildNodeIDs: string[];
  parentID: string | undefined;
  path: string;
  type: 'COMPOSITE';
}

export interface State {
  orderedRootIDs: string[];
  tree: { [path: string]: DocTree };
}

export const DefaultState: State = {
  orderedRootIDs: [],
  tree: {},
};

export default function docTree(
  state: State = DefaultState,
  action: PureAction,
): State {
  switch (action.type) {
    case 'ADD_DOCUMENT': {
      return addDocument(state, action.documentLocal);
    }

    case 'SET_DOCUMENT': {
      return setDocument(state, action.document);
    }

    default:
      return state;
  }
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

function addDocument(state: State, document: Document): State {
  let tree = { ...state.tree };

  if (document.groups.length === 0) {
    const treeID = createAtomicTreeID();
    tree[treeID] = {
      documentRef: createDocumentRef(document),
      name: document.name,
      parentID: undefined,
      path: document.name,
      id: treeID,
      type: 'ATOMIC',
    };
    return {
      ...state,
      orderedRootIDs: [treeID].concat(state.orderedRootIDs),
      tree,
    };
  }

  const orderedRootIDs = state.orderedRootIDs.slice();

  for (const group of document.groups) {
    const tokens = group.split('/');
    const parentPaths = tokens.map((token, i) => [
      token,
      tokens.slice(0, i + 1).join('/'),
    ]);

    let parent: DocTree$Composite | undefined;
    for (const [token, path] of parentPaths) {
      const compositeID = createComposteTreeID(path);

      // Check if the composite id already exists.
      if (tree[compositeID]) {
        parent = tree[compositeID] as DocTree$Composite;
        break;
      }

      const node: DocTree$Composite = {
        id: compositeID,
        name: token,
        orderedChildNodeIDs: [],
        parentID: parent && parent.id,
        path,
        type: 'COMPOSITE',
      };

      tree[compositeID] = node;

      // If there is a parent node, need to potentially add this node as
      if (parent) {
        const orderedChildNodeIDs = [compositeID].concat(
          parent.orderedChildNodeIDs,
        );

        const newParent = { ...parent, orderedChildNodeIDs };
        tree[newParent.id] = newParent;
      } else {
        // There is no parent, so this is a root node, should add it
        // to the list of root node ids.
        orderedRootIDs.unshift(node.id);
      }

      parent = node;
    }

    const lastParent = nullthrows(parent);

    const newAtomicNode: DocTree$Atomic = {
      documentRef: createDocumentRef(document),
      id: createAtomicTreeID(),
      name: document.name,
      path: `${lastParent.path}/${document.name}`,
      parentID: lastParent.id,
      type: 'ATOMIC',
    };

    const lastParentUpdated: DocTree$Composite = {
      ...lastParent,
      orderedChildNodeIDs: [newAtomicNode.id].concat(
        lastParent.orderedChildNodeIDs,
      ),
    };

    tree[newAtomicNode.id] = newAtomicNode;
    tree[lastParentUpdated.id] = lastParentUpdated;
  }

  return { ...state, orderedRootIDs, tree };
}

function setDocument(state: State, document: Document): State {
  // TODO: This method supports name changes of documents. It does not support
  // changing the group that the document belongs to.

  const tree = { ...state.tree };

  // PERF: May want to rethink defining the tree id such that it is constant
  // time lookup for document nodes.
  for (const node of Object.values(tree)) {
    if (node.type === 'ATOMIC' && matchesRef(document, node.documentRef)) {
      tree[node.id] = { ...node, name: document.name };
    }
  }

  return { ...state, tree };
}

let idIndex: number = 1;

function createAtomicTreeID(): string {
  return `ATOMIC_${idIndex}`;
}

function createComposteTreeID(path: string): string {
  return `COMPOSITE_${path}`;
}
