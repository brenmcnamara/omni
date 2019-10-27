import './App.css';

import classnames from 'classnames';
import FileTree from './file-tree/FileTree';
import LeftPane from './LeftPane';
import MarkdownEditor from './file-editor/MarkdownEditor';
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
        <MarkdownEditor classes={{ root: classnames('padding-all-12') }}>
          <TrueSeeker />
        </MarkdownEditor>
      </RightPane>
    </div>
  );
};

export default App;
