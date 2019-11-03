import classnames from 'classnames';
import React from 'react';
import ToolbarButton from './ToolbarButton';

import { contrast } from '../icons';

interface Props {}

const DarkLightModeToolbarButton: React.FC<Props> = (props: Props) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

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
      <img className="img-size-20" src={contrast} />
    </ToolbarButton>
  );
};

export default DarkLightModeToolbarButton;
