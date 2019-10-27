import './App.css';

import classnames from 'classnames';
import FileTree from './file-tree/FileTree';
import FileViewer from './file-viewer/FileViewer';
import LeftPane from './LeftPane';
import React from 'react';
import RightPane from './RightPane';
import TrueSeeker from './content/true-seeker';

const App: React.FC = () => {
  return (
    <div className="App">
      <LeftPane classes={{ root: 'padding-top-40' }}>
        <FileTree />
      </LeftPane>
      <RightPane>
        <FileViewer classes={{ root: classnames('padding-all-12') }}>
          <TrueSeeker />
        </FileViewer>
      </RightPane>
    </div>
  );
};

export default App;
