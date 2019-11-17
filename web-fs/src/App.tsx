import ContentViewer from './ContentViewer';
import FileTree from './file-tree/FileTree';
import PageLayout from './page-layout';
import React from 'react';
import ToolbarButtons from './toolbar-buttons/ToolbarButtons';

const App: React.FC = () => {
  return (
    <PageLayout
      Left={<FileTree />}
      Right={<ContentViewer />}
      ToolbarButtons={<ToolbarButtons />}
    />
  );
};

export default App;
