import { Action } from './actions';
import { StoreState } from './Store';
import {
  useDispatch as useDispatchUNTYPED,
  useSelector as useSelectorUNTYPED,
} from 'react-redux';

export function useDispatch(): (action: Action) => void {
  return useDispatchUNTYPED();
}

export function useSelector<TResult>(
  selector: (state: StoreState) => TResult,
): TResult {
  return useSelectorUNTYPED(selector);
}
