import { Theme } from './Theme';
import { useState, useEffect } from 'react';

type ThemeSetter = (theme: Theme) => void;

const LocalStorageManager = {
  getActiveState(): Theme {
    const value = localStorage.getItem('v1.theme');
    if (value === 'Dark') {
      return 'Dark';
    }
    return 'Light';
  },

  setActiveState(state: Theme) {
    localStorage.setItem('v1.theme', state);
  },
};

let activeTheme: Theme = LocalStorageManager.getActiveState();

const themeSetters: ThemeSetter[] = [];

function setThemeMaster(theme: Theme) {
  console.log('calling setter');
  activeTheme = theme;
  LocalStorageManager.setActiveState(theme);
  themeSetters.forEach(setThemeSlave => setThemeSlave(theme));
}

export default function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setThemeSlave] = useState(activeTheme);
  console.log(theme);

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

  return [theme, setThemeMaster];
}
