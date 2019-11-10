import './FileEditor.css';

import classnames from 'classnames';
import getThemeClassName from '../themes/getThemeClassName';
import React from 'react';
import useTheme from '../themes/useTheme';

import { Editor } from 'draft-js';

interface Props {}

const FileEditor: React.FC<Props> = (props: Props) => {
  const theme = useTheme()[0];
  const themeClassName = getThemeClassName(theme);

  return (
    <div
      className={classnames('FileEditor-root', 'margin-all-20', themeClassName)}
    >
      <div
        className={classnames(
          'FileEditor-titleEditorContainer',
          'border-bottom',
        )}
      >
        <div className="FileEditor-titleEditor" contentEditable />
      </div>
    </div>
  );
};

export default FileEditor;
