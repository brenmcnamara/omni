import * as t from 'io-ts';
import tStringSerialize from './tSerialize/tStringSerialize';

import { PureAction } from './actions';
import { ThemeType, tThemeType } from '../theme';

// -----------------------------------------------------------------------------
// State
// -----------------------------------------------------------------------------

export interface State {
  themeType: ThemeType;
}

export const tStateSerialize = t.type({
  themeType: tThemeType,
});

export const DefaultState: State = {
  themeType: 'Light',
};

// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------

export default function configuration(
  state: State = DefaultState,
  action: PureAction,
): State {
  switch (action.type) {
    case 'SET_THEME_TYPE':
      return { ...state, themeType: action.themeType };
  }

  return state;
}
