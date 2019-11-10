import './ContentViewer.css';

import FileEditor from './file-editor';
import React, { useState } from 'react';

const ContentViewer: React.FC = () => {
  const [title, setTitle] = useState('Untitled Document');

  function onChangeTitle(title: string) {
    setTitle(title);
  }

  return (
    <div className="ContentViewer-root">
      <FileEditor onChangeTitle={onChangeTitle} title={title} />
    </div>
  );
};

export default ContentViewer;
