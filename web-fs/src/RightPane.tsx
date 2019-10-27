import './App.css';

import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const RightPane: React.FC<Props> = (props: Props) => {
  return (
    <div className="App-RightPane">
      <div className="App-RightPaneContent">{props.children}</div>
    </div>
  );
};

export default RightPane;
