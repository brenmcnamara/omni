import './FileEditor.css';

import classnames from 'classnames';
import React, { useEffect, useRef } from 'react';
import useTheme from '../theme/useTheme';

import { KeyMap } from './Keys';

interface Props {
  onChange: (title: string) => void;
  onEnter: () => void;
  title: string;
}

const FileEditorTitle: React.FC<Props> = (props: Props) => {
  const { theme } = useTheme()[0];

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

  function onFocus(event: React.FormEvent<HTMLDivElement>) {
    const element = titleEditorRef.current;
    if (!element) {
      return;
    }

    const selection = window.getSelection();
    if (!selection) {
      return;
    }

    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
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
        theme.fontColorPrimary,
        'FileEditor-titleEditorContainer',
        'border-bottom',
      )}
    >
      <div
        className={classnames(
          'FileEditor-titleEditor',
          'padding-bottom-20',
          theme.fontColorPrimary,
        )}
        contentEditable
        onFocus={onFocus}
        onInput={onInput}
        onKeyDown={onKeyDown}
        ref={titleEditorRef}
      />
    </div>
  );
};

export default FileEditorTitle;
