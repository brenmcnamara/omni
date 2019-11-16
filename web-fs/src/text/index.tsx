import classnames from 'classnames';
import FontMap, { Font } from './FontMap';
import React from 'react';

import { ClassValue } from 'classnames/types';

interface Classes {
  root?: ClassValue;
}

interface Props {
  font: Font;
  children?: React.ReactNode;
  classes?: Classes;
}

const Text = (props: Props) => {
  return (
    <span
      className={classnames(
        FontMap[props.font],
        props.classes && props.classes.root,
      )}
    >
      {props.children}
    </span>
  );
};

export default Text;
