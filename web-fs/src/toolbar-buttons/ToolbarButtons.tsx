import DarkLightModeToolbarButton from './DarkLightModeToolbarButton';
import React from 'react';

interface Props {}

const ToolbarButtons: React.FC<Props> = (props: Props) => {
  return (
    <>
      <DarkLightModeToolbarButton />
    </>
  );
};

export default ToolbarButtons;
