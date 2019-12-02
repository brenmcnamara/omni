import * as t from 'io-ts';
import classnames from 'classnames';
import memoize from '../memoize';
import Dark from './themes/Dark.module.css';
import Light from './themes/Light.module.css';

import { Theme } from './Theme';

const ThemeMap = {
  // @ts-ignore
  Dark: Dark as Theme,
  // @ts-ignore
  Light: Light as Theme,
};

export type ThemeType = keyof typeof ThemeMap;

export const tThemeType: t.Type<ThemeType> = t.union(
  // @ts-ignore
  Object.keys(ThemeMap).map(themeType => t.literal(themeType)),
);

export interface ThemeInfo {
  theme: Theme;
  themeIdentifier: string;
  themeWithoutTransitions: Theme;
  themeType: ThemeType;
}

export const getThemeInfoMap = memoize(() =>
  mapObject(
    ThemeMap,
    (themeType, theme): ThemeInfo => ({
      theme: addThemeClassNames(theme),
      themeIdentifier: `Theme-${themeType}`,
      themeWithoutTransitions: theme,
      themeType,
    }),
  ),
);

// -----------------------------------------------------------------------------
// UTILS
// -----------------------------------------------------------------------------

function addThemeClassNames(theme: Theme): Theme {
  // @ts-ignore
  let themeWithTransitions: Theme = {};

  for (const key in theme) {
    // @ts-ignore
    const val: string = theme[key];
    const classNames = classnames(val, 'contains-theme');
    // @ts-ignore
    themeWithTransitions[key] = classNames;
  }

  return themeWithTransitions;
}

function mapObject<TObj, TReturn>(
  obj: TObj,
  mapper: (key: keyof TObj, val: TObj[keyof TObj]) => TReturn,
): { [key in keyof TObj]: TReturn } {
  // @ts-ignore
  const newObj: any = {};
  for (const key in obj) {
    // @ts-ignore
    newObj[key] = mapper(key, obj[key]);
  }
  return newObj;
}
