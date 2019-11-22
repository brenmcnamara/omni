import { Action } from './actions';

export interface State {}

const DEFAULT_STATE: State = {};

export default function editMode(
  state: State = DEFAULT_STATE,
  action: Action,
): State {
  switch (action) {
    default:
      return state;
  }
}
