import classnames from 'classnames';
import ThemeMap, { ThemeType } from './ThemeMap';

import { Theme } from './Theme';
import { useState, useEffect, useMemo } from 'react';

type ThemeTypeSetter = (themeType: ThemeType) => void;

type ThemeInfoMapType = {
  [themeType in ThemeType]: ThemeInfo;
};

export interface ThemeInfo {
  theme: Theme;
  themeWithoutTransitions: Theme;
  themeType: ThemeType;
}

const DefaultThemeType: ThemeType = 'Light';

const LocalStorageManager = {
  getActiveState(): ThemeType {
    const value = localStorage.getItem('v1.theme');
    if (value && Object.keys(ThemeMap).includes(value)) {
      return value as ThemeType;
    }
    return DefaultThemeType;
  },

  setActiveState(state: ThemeType) {
    localStorage.setItem('v1.theme', state);
  },
};

let activeThemeType: ThemeType = LocalStorageManager.getActiveState();

const themeSetters: ThemeTypeSetter[] = [];

function setThemeMaster(themeType: ThemeType) {
  activeThemeType = themeType;
  LocalStorageManager.setActiveState(themeType);
  themeSetters.forEach(setThemeSlave => setThemeSlave(themeType));
}

export default function useTheme(): [ThemeInfo, (theme: ThemeType) => void] {
  const [themeType, setThemeSlave] = useState(activeThemeType);

  const themeInfoMap = useThemeInfoMap();

  useEffect(() => {
    themeSetters.push(setThemeSlave);

    // Unsubscribe
    return () => {
      const index = themeSetters.indexOf(setThemeSlave);
      if (index >= 0) {
        themeSetters.splice(index, 1);
      }
    };
  }, []);

  return [themeInfoMap[themeType], setThemeMaster];
}

function useThemeInfoMap(): ThemeInfoMapType {
  return useMemo(() => {
    // @ts-ignore
    const themeInfoMap: ThemeInfoMapType = {};

    for (const themeTypeRAW in ThemeMap) {
      const themeType = themeTypeRAW as ThemeType;
      const theme = ThemeMap[themeType] as Theme;

      const themeInfo: ThemeInfo = {
        theme: addTransitions(theme),
        themeWithoutTransitions: theme,
        themeType,
      };

      themeInfoMap[themeType] = themeInfo;
    }

    return themeInfoMap;
  }, []);
}

function addTransitions(theme: Theme): Theme {
  // @ts-ignore
  let themeWithTransitions: Theme = {};

  for (const key in theme) {
    // @ts-ignore
    themeWithTransitions[key] = classnames(theme[key], 'transitions-all-20ms');
  }

  return themeWithTransitions;
}
