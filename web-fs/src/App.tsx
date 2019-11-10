import ContentViewer from './ContentViewer';
import FileTree from './file-tree/FileTree';
import PageLayout from './page-layout';
import React from 'react';
import Toolbar from './toolbar/Toolbar';

const App: React.FC = () => {
  return (
    <PageLayout
      Left={<FileTree />}
      Right={<ContentViewer />}
      Toolbar={<Toolbar />}
    />
  );
};

export default App;
