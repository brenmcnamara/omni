import { Action } from './actions';
import { Model as Document, Ref as DocumentRef } from './Document.model';

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
    case 'ADD_DOCUMENT': {
      return addDocument(state, action.document);
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
