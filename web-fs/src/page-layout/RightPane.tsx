import './PageLayout.css';

import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const RightPane: React.FC<Props> = (props: Props) => {
  return (
    <div className="PageLayout-RightPane">
      <div className="PageLayout-RightPaneContent">{props.children}</div>
    </div>
  );
};

export default RightPane;
