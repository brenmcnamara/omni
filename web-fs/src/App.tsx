import './App.css';

import FileTree from './file-tree/FileTree';
import LeftPane from './LeftPane';
import React from 'react';
import RightPane from './RightPane';
import Toolbar from './toolbar/Toolbar';
import TrueSeeker from './content/true-seeker';

const App: React.FC = () => {
  return (
    <div className="App">
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
