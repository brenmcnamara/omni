import classnames from 'classnames';
import FontMap, { Font } from './FontMap';
import React from 'react';

import { ClassValue } from 'classnames/types';
import { Theme } from '../theme/Theme';
import { useTheme } from '../theme';

type FontColor = 'primary' | 'secondary' | 'tertiary' | 'black' | 'white';

interface Classes {
  root?: ClassValue;
}

interface Props {
  children?: React.ReactNode;
  classes?: Classes;
  font: Font;
  fontColor: FontColor;
}

const Text = (props: Props) => {
  const { theme } = useTheme()[0];

  return (
    <span
      className={classnames(
        FontMap[props.font],
        props.classes && props.classes.root,
        getThemeClassNames(props, theme),
      )}
    >
      {props.children}
    </span>
  );
};

export default Text;

function getThemeClassNames(props: Props, theme: Theme) {
  switch (props.fontColor) {
    case 'primary':
      return theme.fontColorPrimary;

    case 'secondary':
      return theme.fontColorSecondary;

    case 'tertiary':
      return theme.fontColorTertiary;

    case 'black':
      return 'color-black';

    case 'white':
      return 'color-white';
  }
}
