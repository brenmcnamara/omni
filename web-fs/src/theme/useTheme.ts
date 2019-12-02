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

function setterMaster(themeType: ThemeType) {
  setterSlaves.forEach(setter => setter(themeType));
}
