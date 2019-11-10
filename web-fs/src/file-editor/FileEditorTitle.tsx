import './FileEditor.css';

import classnames from 'classnames';
import getThemeClassName from '../themes/getThemeClassName';
import React, { useEffect, useRef } from 'react';
import useTheme from '../themes/useTheme';

import { getTextClassNames } from '../text';
import { KeyMap } from './Keys';

interface Props {
  onChange: (title: string) => void;
  onEnter: () => void;
  title: string;
}

const FileEditorTitle: React.FC<Props> = (props: Props) => {
  const theme = useTheme()[0];
  const themeClassName = getThemeClassName(theme);

  const titleEditorRef = useRef<HTMLDivElement | null>(null);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (KeyMap.get(event.keyCode) === 'ENTER') {
      event.preventDefault();
      props.onEnter();
      return;
    }
  }

  function onInput(event: React.FormEvent<HTMLDivElement>) {
    const element = titleEditorRef.current;
    if (!element) {
      return;
    }
    props.onChange(element.innerText);
  }

  useEffect(
    function onChangeTitleRef() {
      const element = titleEditorRef.current;
      if (!element) {
        return;
      }
      element.innerText = props.title;
    },
    [titleEditorRef.current],
  );

  return (
    <div
      className={classnames(
        themeClassName,
        'FileEditor-titleEditorContainer',
        'border-bottom',
      )}
    >
      <div
        className={classnames(
          'FileEditor-titleEditor',
          'padding-bottom-20',
          getTextClassNames({
            fontColor: 'primary',
            fontMode: theme === 'Dark' ? 'darkBackground' : 'lightBackground',
            fontStyle: 'doc-h3',
          }),
        )}
        contentEditable
        onInput={onInput}
        onKeyDown={onKeyDown}
        ref={titleEditorRef}
      />
    </div>
  );
};

export default FileEditorTitle;
