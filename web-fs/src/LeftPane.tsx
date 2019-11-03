import './App.css';

import classnames from 'classnames';
import getThemeClassName from './themes/getThemeClassName';
import React from 'react';
import useTheme from './themes/useTheme';

import { ClassValue } from 'classnames/types';

interface Classes {
  root?: ClassValue;
}

interface Props {
  children?: React.ReactNode;
  classes?: Classes;
}

const LeftPane: React.FC<Props> = (props: Props) => {
  const theme = useTheme()[0];
  return (
    <div
      className={classnames(
        'App-LeftPane',
        'border-right',
        getThemeClassName(theme),
        props.classes && props.classes.root,
      )}
    >
      <div className="App-LeftPaneContent">{props.children}</div>
    </div>
  );
};

export default LeftPane;
