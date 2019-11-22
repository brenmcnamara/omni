import { State } from './Store';
import { useSelector as useSelectorUNTYPED } from 'react-redux';

export function useSelector<TResult>(
  selector: (state: State) => TResult,
): TResult {
  return useSelectorUNTYPED(selector);
}
