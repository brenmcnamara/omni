import { PureAction } from './actions';
import { StoreState } from './Store';
import {
  useDispatch as useDispatchUNTYPED,
  useSelector as useSelectorUNTYPED,
} from 'react-redux';

export function useDispatch(): (action: PureAction) => void {
  return useDispatchUNTYPED();
}

export function useSelector<TResult>(
  selector: (state: StoreState) => TResult,
): TResult {
  return useSelectorUNTYPED(selector);
}
