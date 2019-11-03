import './ToolbarButton.css';

import classnames from 'classnames';
import React from 'react';

import { ClassValue } from 'classnames/types';

interface Classes {
  root: ClassValue;
}
interface Props {
  children?: React.ReactNode;
  classes?: Classes;
  onClick: () => void;
}

const ToolbarButton: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={classnames(
        'ToolbarButton-root',
        props.classes && props.classes.root,
      )}
      onClick={() => props.onClick()}
    >
      {props.children}
    </div>
  );
};

export default ToolbarButton;
