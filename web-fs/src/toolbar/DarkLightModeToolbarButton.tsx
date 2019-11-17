import classnames from 'classnames';
import Icon from '../Icon';
import React, { useEffect } from 'react';
import ToolbarButton from './ToolbarButton';
import toolbarButtonStyles from './ToolbarButton.module.css';
import useTheme from '../theme/useTheme';

import { adjust } from '../icons';

interface Props {}

const DarkLightModeToolbarButton: React.FC<Props> = (props: Props) => {
  const [themeInfo, setThemeType] = useTheme();
  const { themeType } = themeInfo;
  const isDarkMode = themeType === 'Dark';

  useEffect(() => {
    const newThemeType = isDarkMode ? 'Dark' : 'Light';
    if (themeType !== newThemeType) {
      setThemeType(newThemeType);
    }
  });

  return (
    <ToolbarButton
      classes={{
        root: classnames({
          [toolbarButtonStyles.darkLightModeToolbarButton]: true,
          [toolbarButtonStyles.darkLightModeToolbarButton_isDarkMode]: isDarkMode,
          [toolbarButtonStyles.darkLightModeToolbarButton_isLightMode]: !isDarkMode,
        }),
      }}
      onClick={() => setThemeType(isDarkMode ? 'Light' : 'Dark')}
    >
      <Icon icon={adjust} iconColor="primary" size={16} />
    </ToolbarButton>
  );
};

export default DarkLightModeToolbarButton;
