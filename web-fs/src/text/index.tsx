import './Text.css';

import classnames from 'classnames';
import React from 'react';
import useTheme from '../themes/useTheme';

import {
  FontColor,
  FontMode,
  FontStyle,
  getFontColorClassName,
  getFontModeClassName,
  getFontStyleClassName,
} from './font';

interface Props {
  children?: React.ReactNode;
  fontColor: FontColor;
  fontMode?: FontMode;
  fontStyle: FontStyle;
}

const Text = (props: Props) => {
  const fontMode: FontMode = props.fontMode || 'lightBackground';

  return (
    <span
      className={classnames(
        getFontStyleClassName(props.fontStyle),
        getFontColorClassName(props.fontColor),
        getFontModeClassName(fontMode),
      )}
    >
      {props.children}
    </span>
  );
};

export default Text;

type ThemedText$Props = Omit<Props, 'fontMode'>;

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

export { getFontColorClassName };

export { getFontModeClassName };

export { getFontStyleClassName };
