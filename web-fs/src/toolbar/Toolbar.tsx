import DarkLightModeToolbarButton from './DarkLightModeToolbarButton';
import React from 'react';
import ToggleLeftPaneButton from './ToggleLeftPaneButton';

interface Props {}

const Toolbar: React.FC<Props> = (props: Props) => {
  return (
    <>
      <ToggleLeftPaneButton />
      <DarkLightModeToolbarButton />
    </>
  );
};

export default Toolbar;
