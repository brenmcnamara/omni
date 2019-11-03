import './ToolbarButton.css';

import React from 'react';

interface Props {
  icon: string;
}

const ToolbarButton: React.FC<Props> = (props: Props) => {
  return (
    <div className="ToolbarButton-root">
      <img className="img-size-16" src={props.icon} />
    </div>
  );
};

export default ToolbarButton;
