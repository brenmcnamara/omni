import classnames from 'classnames';
import React, { useEffect } from 'react';
import ToolbarButton from './ToolbarButton';
import useTheme from '../themes/useTheme';

import { adjust } from '../icons';
import { ThemedIcon } from '../Icon';

interface Props {}

const DarkLightModeToolbarButton: React.FC<Props> = (props: Props) => {
  const [theme, setTheme] = useTheme();
  const isDarkMode = theme === 'Dark';

  useEffect(() => {
    const newTheme = isDarkMode ? 'Dark' : 'Light';
    if (theme !== newTheme) {
      setTheme(newTheme);
    }
  });

  return (
    <ToolbarButton
      classes={{
        root: classnames({
          'DarkLightModeToolbarButton-isDarkMode': isDarkMode,
          'DarkLightModeToolbarButton-isLightMode': isDarkMode,
        }),
      }}
      onClick={() => setTheme(isDarkMode ? 'Light' : 'Dark')}
    >
      <ThemedIcon size="icon-size-20" icon={adjust} />
    </ToolbarButton>
  );
};

export default DarkLightModeToolbarButton;
