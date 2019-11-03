import { Theme } from './Theme';
import { useState, useEffect } from 'react';

type ThemeSetter = (theme: Theme) => void;

let activeTheme: Theme = 'Light';

const themeSetters: ThemeSetter[] = [];

function setThemeMaster(theme: Theme) {
  themeSetters.forEach(setThemeSlave => setThemeSlave(theme));
}

export default function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setThemeSlave] = useState(activeTheme);

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
