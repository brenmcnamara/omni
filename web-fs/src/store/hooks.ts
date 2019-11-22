import { Action } from './actions';
import { State } from './Store';
import {
  useDispatch as useDispatchUNTYPED,
  useSelector as useSelectorUNTYPED,
} from 'react-redux';

export function useDispatch(): (action: Action) => void {
  return useDispatchUNTYPED();
}

export function useSelector<TResult>(
  selector: (state: State) => TResult,
): TResult {
  return useSelectorUNTYPED(selector);
}
