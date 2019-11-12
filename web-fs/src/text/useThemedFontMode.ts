import useTheme from '../themes/useTheme';

import { FontMode } from './font';
import { getTextClassNames } from '.';

export default function useThemedFontMode(): FontMode {
  const theme = useTheme()[0];
  return theme === 'Dark' ? 'darkBackground' : 'lightBackground';
}
