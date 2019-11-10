import './App.css';

import classnames from 'classnames';
import FileEditor from './file-editor';
import FileTree from './file-tree/FileTree';
import getThemeClassName from './themes/getThemeClassName';
import LeftPane from './LeftPane';
import React from 'react';
import RightPane from './RightPane';
import Toolbar from './toolbar/Toolbar';
import useTheme from './themes/useTheme';

const App: React.FC = () => {
  const theme = useTheme()[0];

  return (
    <div className={classnames('App', getThemeClassName(theme))}>
      <LeftPane classes={{ root: 'padding-top-40' }}>
        <FileTree />
      </LeftPane>
      <RightPane>
        <FileEditor />
      </RightPane>
      <Toolbar />
    </div>
  );
};

export default App;
