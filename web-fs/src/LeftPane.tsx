import './App.css';

import classnames from 'classnames';
import React from 'react';

import { ClassValue } from 'classnames/types';

interface Classes {
  root?: ClassValue;
}

interface Props {
  children?: React.ReactNode;
  classes?: Classes;
}

const LeftPane: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={classnames(
        'App-LeftPane',
        props.classes && props.classes.root,
      )}
    >
      <div className="App-LeftPaneContent">{props.children}</div>
    </div>
  );
};

export default LeftPane;
