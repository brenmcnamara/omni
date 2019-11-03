import './Text.css';

import classnames from 'classnames';
import React from 'react';
import useTheme from './themes/useTheme';

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

type ThemedText$Props = {
  [TK in keyof Props]: TK extends 'fontMode' ? never : Props[TK];
};

export const ThemedText: React.FC<ThemedText$Props> = (
  props: ThemedText$Props,
) => {
  const theme = useTheme()[0];
  return (
    <Text
      fontMode={theme === 'Dark' ? 'darkBackground' : 'lightBackground'}
      {...props}
    />
  );
};
