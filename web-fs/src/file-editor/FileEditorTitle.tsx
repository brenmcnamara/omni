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
    setTitleSelection(titleEditorRef, [0, props.title.length]);
  }

  useEffect(
    function onChangeTitleRef() {
      const element = titleEditorRef.current;
      if (!element || element.innerText === props.title) {
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

// -----------------------------------------------------------------------------
// SELECTION UTILS
// -----------------------------------------------------------------------------

type TitleSelection = [number, number];

type TitleRef = React.RefObject<HTMLDivElement>;

function getTitleSelection(ref: TitleRef): TitleSelection | undefined {
  const { current } = ref;
  if (!current) {
    return undefined;
  }

  const selection = window.getSelection();
  if (!selection || selection.type === 'None') {
    return undefined;
  }

  const { anchorNode, focusNode } = selection;
  if (!anchorNode || !focusNode) {
    return undefined;
  }

  const isSelectingTitle =
    (anchorNode === current || anchorNode.parentNode === current) &&
    (focusNode === current || focusNode.parentNode === current);

  if (!isSelectingTitle) {
    return undefined;
  }

  const start = anchorNode === current ? 0 : selection.anchorOffset;
  const end =
    focusNode === current ? current.innerText.length : selection.focusOffset;

  return [start, end];
}

function setTitleSelection(ref: TitleRef, selection: TitleSelection) {
  const nativeSelection = window.getSelection();
  if (!nativeSelection) {
    console.log('no selection');
    return;
  }

  const { current } = ref;

  if (!current) {
    console.log('no current');
    return;
  }

  const min = 0;
  const max = current.innerText.length;

  if (
    selection[0] < min ||
    selection[0] > max ||
    selection[1] < min ||
    selection[1] > max
  ) {
    console.log('out of range');
    return;
  }

  const range = document.createRange();
  range.setStart(current.childNodes[0], selection[0]);
  range.setEnd(current.childNodes[0], selection[1]);

  nativeSelection.removeAllRanges();
  nativeSelection.addRange(range);
}
