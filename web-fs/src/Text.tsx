import './Text.css';

import classnames from 'classnames';
import React from 'react';

import { FontColorStyle, FontMode, FontStyle } from './font';

interface Props {
  children?: React.ReactNode;
  fontColorStyle: FontColorStyle;
  fontMode?: FontMode;
  fontStyle: FontStyle;
}

const Text = (props: Props) => {
  const fontMode = props.fontMode || 'light';

  return (
    <span
      className={classnames(
        `FontStyle-${props.fontStyle}`,
        `FontColorStyle-${props.fontColorStyle}`,
        `FontMode-${fontMode}`,
      )}
    >
      {props.children}
    </span>
  );
};

export default Text;
