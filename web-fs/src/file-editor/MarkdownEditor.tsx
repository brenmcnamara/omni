import './MarkdownEditor.css';

import classnames from 'classnames';
import React from 'react';

import { ClassValue } from 'classnames/types';

interface Classes {
  root?: ClassValue;
}
interface Props {
  children?: React.ReactNode;
  classes?: Classes;
}

const MarkdownEditor: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={classnames(
        'MarkdownEditor-root',
        props.classes && props.classes.root,
      )}
    >
      {props.children}
    </div>
  );
};

export default MarkdownEditor;
