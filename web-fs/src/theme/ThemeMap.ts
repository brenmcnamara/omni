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

export default ThemeMap;
