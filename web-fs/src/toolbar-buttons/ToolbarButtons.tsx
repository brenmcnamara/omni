import CreateFileToolbarButton from './CreateFileToolbarButton';
import DarkLightModeToolbarButton from './DarkLightModeToolbarButton';
import React from 'react';

interface Props {}

const ToolbarButtons: React.FC<Props> = (props: Props) => {
  return (
    <>
      <CreateFileToolbarButton />
      <DarkLightModeToolbarButton />
    </>
  );
};

export default ToolbarButtons;
