import { Dispatch, StoreState } from './Store';
import {
  useDispatch as useDispatchUNTYPED,
  useSelector as useSelectorUNTYPED,
} from 'react-redux';

export function useDispatch(): Dispatch {
  return useDispatchUNTYPED();
}

export function useSelector<TResult>(
  selector: (state: StoreState) => TResult,
  equalityFn?: (lhs: TResult, rhs: TResult) => boolean,
): TResult {
  return useSelectorUNTYPED(selector, equalityFn);
}
