import ContentViewer from './content-viewer';
import FileTree from './file-tree/FileTree';
import PageLayout from './page-layout';
import React from 'react';
import Store from './store';
import ToolbarButtons from './toolbar-buttons/ToolbarButtons';

import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <PageLayout
        Left={<FileTree />}
        Right={<ContentViewer />}
        ToolbarButtons={<ToolbarButtons />}
      />
    </Provider>
  );
};

export default App;
