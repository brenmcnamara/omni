import {
  getThemeInfoMap,
  ThemeInfo,
  ThemeType,
  tThemeType,
} from './ThemeInfoMap';
import { useEffect } from 'react';
import { useLocalStorage } from '../store/LocalStorage';

type Setter = (themeType: ThemeType) => void;

const setterSlaves: Setter[] = [];

const DefaultThemeType: ThemeType = 'Light';

// NOTE: This value is defined in CSS as well.
const ThemeTransitionDurationMilliseconds: number = 200;

// -----------------------------------------------------------------------------
// useTheme
// -----------------------------------------------------------------------------

export default function useTheme(): [ThemeInfo, Setter] {
  const [themeType, setThemeType] = useLocalStorage(
    'ThemeType',
    'v1.0',
    tThemeType,
    DefaultThemeType,
  );

  useEffect(() => {
    setterSlaves.push(setThemeType);

    return () => {
      const index = setterSlaves.indexOf(setThemeType);
      if (index >= 0) {
        setterSlaves.splice(index, 1);
      }
    };
  }, [setThemeType]);

  return [getThemeInfoMap()[themeType], setterMaster];
}

// -----------------------------------------------------------------------------
// useRegisterThemeManager
// -----------------------------------------------------------------------------

type OnWillChangeThemeCallback = (onReady: () => void) => void;

let willChangeThemeCallback: OnWillChangeThemeCallback | undefined = undefined;

type OnDidChangeThemeCallback = () => void;

let didChangeThemeCallback: OnDidChangeThemeCallback | undefined = undefined;

export function useRegisterThemeManager(
  onWillChange: OnWillChangeThemeCallback,
  onDidChange: OnDidChangeThemeCallback,
) {
  useEffect(() => {
    if (willChangeThemeCallback || didChangeThemeCallback) {
      throw Error(`Only 1 theme manager can be registered at a time`);
    }
    willChangeThemeCallback = onWillChange;
    didChangeThemeCallback = onDidChange;

    return () => {
      willChangeThemeCallback = undefined;
      didChangeThemeCallback = undefined;
    };
  }, []);
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

let themeTransitionTimeoutID: ReturnType<typeof setTimeout> | undefined;

function executeSetterSlaves(themeType: ThemeType) {
  setterSlaves.forEach(setter => setter(themeType));
}

function setterMaster(themeType: ThemeType) {
  // If we set the theme before the previous theme transition was complete, then
  // we need to cancel the call to "didChange".

  clearTimeout(themeTransitionTimeoutID);
  if (!willChangeThemeCallback) {
    executeSetterSlaves(themeType);
    return;
  }

  willChangeThemeCallback(function onReady() {
    executeSetterSlaves(themeType);
    // Waiting approximately for the amount of time that it takes to
    // go through a theme transition.
    themeTransitionTimeoutID = setTimeout(() => {
      didChangeThemeCallback && didChangeThemeCallback();
    }, ThemeTransitionDurationMilliseconds);
  });
}
