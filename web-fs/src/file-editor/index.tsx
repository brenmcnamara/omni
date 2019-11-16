import './FileEditor.css';

import classnames from 'classnames';
import FileEditorContent from './FileEditorContent';
import FileEditorTitle from './FileEditorTitle';
import React from 'react';
import useTheme from '../theme/useTheme';

interface Props {
  onChangeTitle: (title: string) => void;
  title: string;
}

const FileEditor: React.FC<Props> = (props: Props) => {
  const theme = useTheme()[0];

  function onChangeTitle(title: string) {}

  function onEnterTitle() {}

  function onChangeContent() {}

  return (
    <div className={classnames('FileEditor-root', 'margin-all-20')}>
      <FileEditorTitle
        onChange={onChangeTitle}
        onEnter={onEnterTitle}
        title="Untitled Document"
      />
      <FileEditorContent onChange={onChangeContent} />
    </div>
  );
};

export default FileEditor;
