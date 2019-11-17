import classnames from 'classnames';
import React from 'react';
import toolbarButtonStyles from './ToolbarButton.module.css';

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
        toolbarButtonStyles.root,
        props.classes && props.classes.root,
        'margin-right-12',
        'margin-right-0-md',
        'margin-bottom-8-md',
      )}
      onClick={() => props.onClick()}
    >
      {props.children}
    </div>
  );
};

export default ToolbarButton;
