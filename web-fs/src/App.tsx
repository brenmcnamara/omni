import ContentViewer from './ContentViewer';
import FileTree from './file-tree/FileTree';
import PageLayout from './page-layout';
import React, { useEffect } from 'react';
import Store from './store';
import ToolbarButtons from './toolbar-buttons/ToolbarButtons';

import { fetchFullState } from './store/actions';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  useEffect(() => {
    // @ts-ignore - Thunk type
    Store.dispatch(fetchFullState());
  }, []);

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
