import classnames from 'classnames';
import fileEditorStyles from './FileEditor.module.css';
import fontStyles from '../../text/Font.module.css';
import React, { useEffect, useRef, useState } from 'react';

import { KeyMap } from './Keys';
import { useTheme } from '../../theme';

interface Props {
  onChange: (title: string) => void;
  onEnter: () => void;
  title: string;
}

const FileEditorTitle: React.FC<Props> = (props: Props) => {
  const { theme } = useTheme()[0];

  const [title, setTitle] = useState(props.title);
  const [isValidTitle, setIsValidTitle] = useState(
    calculateIsValidTitle(props.title),
  );

  const titleEditorRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    function onReceiveNewTitleFromProps() {
      setTitle(props.title);
      setIsValidTitle(calculateIsValidTitle(props.title));

      const element = titleEditorRef.current;
      if (!element || element.innerText === props.title) {
        return;
      }

      element.innerText = props.title;
    },
    [props.title],
  );

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

    const text = element.innerText;

    if (title === text) {
      return;
    }

    setTitle(text);

    const isValidTitle = calculateIsValidTitle(text);
    setIsValidTitle(isValidTitle);
    if (isValidTitle) {
      props.onChange(text);
    }
  }

  function onFocus(event: React.FormEvent<HTMLDivElement>) {
    setTitleSelection(titleEditorRef, [0, props.title.length]);
  }

  return (
    <div
      className={classnames({
        'border-bottom': true,
        [fileEditorStyles.titleEditorContainer]: true,
        [theme.borderColorPrimary]: isValidTitle,
        [theme.borderColorAlert]: !isValidTitle,
      })}
    >
      <div
        className={classnames(
          fontStyles.docH3,
          theme.fontColorPrimary,
          fileEditorStyles.titleEditor,
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
// UTILS
// -----------------------------------------------------------------------------

function calculateIsValidTitle(title: string): boolean {
  return title.trim().length > 0 && !title.includes('/');
}

// -----------------------------------------------------------------------------
// SELECTION UTILS
// -----------------------------------------------------------------------------

type TitleSelection = [number, number];

type TitleRef = React.RefObject<HTMLDivElement>;

// function getTitleSelection(ref: TitleRef): TitleSelection | undefined {
//   const { current } = ref;
//   if (!current) {
//     return undefined;
//   }

//   const selection = window.getSelection();
//   if (!selection || selection.type === 'None') {
//     return undefined;
//   }

//   const { anchorNode, focusNode } = selection;
//   if (!anchorNode || !focusNode) {
//     return undefined;
//   }

//   const isSelectingTitle =
//     (anchorNode === current || anchorNode.parentNode === current) &&
//     (focusNode === current || focusNode.parentNode === current);

//   if (!isSelectingTitle) {
//     return undefined;
//   }

//   const start = anchorNode === current ? 0 : selection.anchorOffset;
//   const end =
//     focusNode === current ? current.innerText.length : selection.focusOffset;

//   return [start, end];
// }

function setTitleSelection(ref: TitleRef, selection: TitleSelection) {
  const nativeSelection = window.getSelection();
  if (!nativeSelection) {
    return;
  }

  const { current } = ref;

  if (!current) {
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
    return;
  }

  const range = document.createRange();
  range.setStart(current.childNodes[0], selection[0]);
  range.setEnd(current.childNodes[0], selection[1]);

  nativeSelection.removeAllRanges();
  nativeSelection.addRange(range);
}
