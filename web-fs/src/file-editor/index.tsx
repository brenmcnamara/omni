import './FileEditor.css';

import classnames from 'classnames';
import FileEditorContent from './FileEditorContent';
import FileEditorTitle from './FileEditorTitle';
import getThemeClassName from '../themes/getThemeClassName';
import React from 'react';
import useTheme from '../themes/useTheme';

interface Props {
  onChangeTitle: (title: string) => void;
  title: string;
}

const FileEditor: React.FC<Props> = (props: Props) => {
  const theme = useTheme()[0];
  const themeClassName = getThemeClassName(theme);

  function onChangeTitle(title: string) {}

  function onEnterTitle() {}

  function onChangeContent() {}

  return (
    <div
      className={classnames('FileEditor-root', 'margin-all-20', themeClassName)}
    >
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
