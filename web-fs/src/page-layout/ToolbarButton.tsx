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
  forceVerticalStackStyling?: boolean;
  onClick: () => void;
}

const ToolbarButton: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={classnames(
        toolbarButtonStyles.root,
        props.classes && props.classes.root,
        !props.forceVerticalStackStyling && 'margin-right-12',
        !props.forceVerticalStackStyling && 'margin-right-0-md',
        props.forceVerticalStackStyling && 'margin-bottom-8',
        'margin-bottom-8-md',
      )}
      onClick={() => props.onClick()}
    >
      {props.children}
    </div>
  );
};

export default ToolbarButton;
