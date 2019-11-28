import { Model as Document, Ref as DocumentRef } from './Document.model';
import { PureAction } from './actions';

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
  action: PureAction,
): State {
  switch (action.type) {
    case 'ADD_DOCUMENT': {
      return addDocument(state, action.document);
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
  if (document.groups.length === 0) {
    // Put document at the root of the tree.
    const tree = state.tree.slice();
    tree.unshift({
      documentRef: document.createRef(),
      name: document.name,
      type: 'ATOMIC',
    });
    return { ...state, tree };
  }

  // TODO: Perf is bad here. Don't need to make a full copy of the
  // doc tree everytime.

  const tree = state.tree.map(node => copyTree(node));

  for (const group of document.groups) {
    let nodes: DocTree[] = tree;

    for (const token of group.split('/')) {
      const childNode = nodes.find(
        n => n.name === token && n.type === 'COMPOSITE',
      ) as DocTree$Composite | undefined;

      if (childNode) {
        nodes = childNode.childNodes;
      } else {
        // Group not found. Need to create new group and scan through subgroups.
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
      documentRef: document.createRef(),
      name: document.name,
      type: 'ATOMIC',
    });
  }

  return { ...state, tree };
}

function setDocument(state: State, document: Document): State {
  // TODO: This method supports name changes of documents. It does not support
  // changing the group that the document belongs to.

  // TODO: Perf is bad here. Don't need to make a full copy of the
  // tree everytime.
  const tree = state.tree.map(node => copyTree(node));

  // Find the document in the tree and make any needed modifications.
  const stack: DocTree[] = tree.slice();
  let next: DocTree | undefined;

  while ((next = stack.pop())) {
    if (next.type === 'ATOMIC' && document.matchesRef(next.documentRef)) {
      next.name = document.name;
      break;
    }
  }

  return { tree };
}

function copyTree(tree: DocTree): DocTree {
  let rootCopy: DocTree;

  const stack: Array<[DocTree, (node: DocTree) => void]> = [
    [tree, (node: DocTree) => (rootCopy = node)],
  ];

  let next: [DocTree, (node: DocTree) => void] | undefined;

  while ((next = stack.pop())) {
    const [node, connectToParent] = next;

    switch (node.type) {
      case 'ATOMIC': {
        connectToParent({ ...node });
        break;
      }

      case 'COMPOSITE': {
        const childNodes = node.childNodes.slice();
        connectToParent({ ...node, childNodes });
        for (let i = 0; i < childNodes.length; ++i) {
          stack.push([
            childNodes[i],
            (node: DocTree) => (childNodes[i] = node),
          ]);
        }
        break;
      }
    }
  }

  // @ts-ignore
  return rootCopy;
}
