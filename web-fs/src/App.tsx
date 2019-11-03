import './App.css';

import classnames from 'classnames';
import FileTree from './file-tree/FileTree';
import getThemeClassName from './themes/getThemeClassName';
import LeftPane from './LeftPane';
import React from 'react';
import RightPane from './RightPane';
import Toolbar from './toolbar/Toolbar';
import TrueSeeker from './content/true-seeker';
import useTheme from './themes/useTheme';

const App: React.FC = () => {
  const theme = useTheme()[0];

  console.log('changing app', theme);

  return (
    <div className={classnames('App', getThemeClassName(theme))}>
      <LeftPane classes={{ root: 'padding-top-40' }}>
        <FileTree />
      </LeftPane>
      <RightPane>
        <Toolbar />
        <TrueSeeker />
      </RightPane>
    </div>
  );
};

export default App;
