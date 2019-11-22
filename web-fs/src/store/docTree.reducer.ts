import { Action } from './actions';
import { DocumentRef } from './Document.model';

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
  return state;
}
