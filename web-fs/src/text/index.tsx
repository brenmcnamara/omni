import './Text.css';

import classnames from 'classnames';
import getFontModeClassNames from './getFontModeClassNames';
import React from 'react';
import useTheme from '../themes/useTheme';
import useThemedFontMode from './useThemedFontMode';

import { FontColor, FontMode, FontStyle, getTextClassNames } from './font';

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
        getTextClassNames({
          fontColor: props.fontColor,
          fontMode,
          fontStyle: props.fontStyle,
        }),
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

export { getFontModeClassNames };
export { getTextClassNames };
export { useThemedFontMode };
