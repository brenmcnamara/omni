import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import ToolbarButton from './ToolbarButton';
import useTheme from '../themes/useTheme';

import { contrast } from '../icons';
import { ThemedIcon } from '../Icon';

interface Props {}

const DarkLightModeToolbarButton: React.FC<Props> = (props: Props) => {
  const [theme, setTheme] = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

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
          'DarkLightModeToolbarButton-isLightMode': !isDarkMode,
        }),
      }}
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      <ThemedIcon classes={{ root: 'img-size-20' }} source={contrast} />
    </ToolbarButton>
  );
};

export default DarkLightModeToolbarButton;
