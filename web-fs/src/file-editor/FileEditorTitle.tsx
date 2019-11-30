import './FileEditor.css';

import classnames from 'classnames';
import fontStyles from '../text/Font.module.css';
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
    [props.title],
  );

  return (
    <div
      className={classnames(
        theme.borderColor,
        'FileEditor-titleEditorContainer',
        'border-bottom',
      )}
    >
      <div
        className={classnames(
          fontStyles.docH3,
          theme.fontColorPrimary,
          'FileEditor-titleEditor',
          'padding-bottom-12',
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
