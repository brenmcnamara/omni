import classnames from 'classnames';
import Icon from '../Icon';
import React, { useEffect } from 'react';
import styles from './DarkLightModeToolbarButton.module.css';
import ToolbarButton from '../page-layout/ToolbarButton';

import { adjust } from '../icons';
import { useTheme } from '../theme';

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
          [styles.root]: true,
          [styles.root_isDarkMode]: isDarkMode,
          [styles.root_isLightMode]: !isDarkMode,
        }),
      }}
      onClick={() => setThemeType(isDarkMode ? 'Light' : 'Dark')}
    >
      <Icon icon={adjust} iconColor="primary" size={16} />
    </ToolbarButton>
  );
};

export default DarkLightModeToolbarButton;
