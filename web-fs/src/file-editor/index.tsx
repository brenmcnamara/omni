import './FileEditor.css';

import classnames from 'classnames';
import FileEditorTitle from './FileEditorTitle';
import getThemeClassName from '../themes/getThemeClassName';
import React from 'react';
import useTheme from '../themes/useTheme';

import { Editor } from 'draft-js';

interface Props {
  onChangeTitle: (title: string) => void;
  title: string;
}

const FileEditor: React.FC<Props> = (props: Props) => {
  const theme = useTheme()[0];
  const themeClassName = getThemeClassName(theme);

  function onChangeTitle(title: string) {}

  function onEnterTitle() {}

  return (
    <div
      className={classnames('FileEditor-root', 'margin-all-20', themeClassName)}
    >
      <FileEditorTitle
        onEnter={onEnterTitle}
        onChange={onChangeTitle}
        title="Untitled Document"
      />
    </div>
  );
};

export default FileEditor;
