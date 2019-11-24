import { Action } from './actions';
import {
  createRef as createDocumentRef,
  LocalRaw as DocumentLocalRaw,
  Ref as DocumentRef,
} from './Document.model';

export type DocTree = DocTree$Atomic | DocTree$Composite;

interface DocTree$Atomic {
  documentRef: DocumentRef;
  name: string;
  type: 'ATOMIC';
}

interface DocTree$Composite {
  childNodes: DocTree[];
  name: string;
  type: 'COMPOSITE';
}

export interface State {
  tree: DocTree[];
}

const DEFAULT_STATE: State = {
  tree: [],
};

export default function docTree(
  state: State = DEFAULT_STATE,
  action: Action,
): State {
  switch (action.type) {
    case 'CREATE_DOCUMENT': {
      return addDocument(state, action.documentLocal);
    }

    default:
      return state;
  }
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

function addDocument(state: State, document: DocumentLocalRaw): State {
  if (document.groups.length === 0) {
    // Put document at the root of the tree.
    const tree = state.tree.slice();
    tree.unshift({
      documentRef: createDocumentRef(document.localID),
      name: document.name,
      type: 'ATOMIC',
    });
    return { ...state, tree };
  }

  const tree = state.tree.slice();

  // First, let's make a copy of the tree.

  for (const group of document.groups) {
    let parent: DocTree$Composite | null = null;
    let nodes: DocTree[] = tree;

    for (const token of group.split('/')) {
      const childNode = nodes.find(
        n => n.name === token && n.type === 'COMPOSITE',
      ) as DocTree$Composite | undefined;

      if (childNode) {
        nodes = childNode.childNodes;
      } else {
        // Group not found. Need to create a new group and scan through the
        // subgroups.
        const newNode: DocTree$Composite = {
          childNodes: [],
          name: token,
          type: 'COMPOSITE',
        };

        nodes.unshift(newNode);
        nodes = newNode.childNodes;
      }
    }

    // After drilling down to the nodes, add the file to the list.
    nodes.unshift({
      documentRef: createDocumentRef(document.localID),
      name: document.name,
      type: 'ATOMIC',
    });
  }

  return { ...state, tree };
}

function copyTree(tree: DocTree): DocTree {
  const copy: DocTree = { ...tree };
  const stack = [tree];

  let next: DocTree | undefined;

  while ((next = stack.pop())) {
    switch (next.type) {
      case 'ATOMIC': {
      }

      case 'COMPOSITE': {
      }
    }
  }

  return copy;
}
