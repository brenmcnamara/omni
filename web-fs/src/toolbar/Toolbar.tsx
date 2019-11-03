import './Toolbar.css';

import React from 'react';
import ToolbarButton from './ToolbarButton';

import { collapse, expand } from '../icons';

interface Props {}

const Toolbar: React.FC<Props> = (props: Props) => {
  return (
    <div className="Toolbar-root">
      <ToolbarButton icon={collapse} />
    </div>
  );
};

export default Toolbar;
