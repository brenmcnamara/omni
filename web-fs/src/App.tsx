import ContentEditor from './content-editor';
import FileTree from './file-tree/FileTree';
import PageLayout from './page-layout';
import React from 'react';
import Store from './store';
import ToolbarButtons from './toolbar-buttons/ToolbarButtons';

import { Provider } from 'react-redux';
import { ThemeManager } from './theme';

const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <ThemeManager>
        <PageLayout
          Left={<FileTree />}
          Right={<ContentEditor />}
          ToolbarButtons={<ToolbarButtons />}
        />
      </ThemeManager>
    </Provider>
  );
};

export default App;
