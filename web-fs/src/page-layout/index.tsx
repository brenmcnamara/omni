import './PageLayout.css';

import classnames from 'classnames';
import getThemeClassName from '../themes/getThemeClassName';
import LeftPane from './LeftPane';
import React from 'react';
import RightPane from './RightPane';
import useTheme from '../themes/useTheme';

interface Props {
  Left: JSX.Element;
  Right: JSX.Element;
  Toolbar: JSX.Element;
}

const App: React.FC<Props> = (props: Props) => {
  const theme = useTheme()[0];

  return (
    <div className={classnames('PageLayout', getThemeClassName(theme))}>
      <LeftPane classes={{ root: 'padding-top-40' }}>{props.Left}</LeftPane>
      <RightPane>{props.Right}</RightPane>
      {props.Toolbar}
    </div>
  );
};

export default App;
