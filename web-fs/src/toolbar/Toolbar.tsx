import './Toolbar.css';

import DarkLightModeToolbarButton from './DarkLightModeToolbarButton';
import React from 'react';

interface Props {}

const Toolbar: React.FC<Props> = (props: Props) => {
  return (
    <div className="Toolbar-root">
      <DarkLightModeToolbarButton />
    </div>
  );
};

export default Toolbar;
