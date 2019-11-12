import classnames from 'classnames';
import getFontModeClassNames from './getFontModeClassNames';

import { ClassValue } from 'classnames/types';

export type FontStyle =
  | 'primary'
  | 'primaryBold'
  | 'heavy'
  | 'doc-h1'
  | 'doc-h2'
  | 'doc-h3'
  | 'doc-p';

export type FontColor = 'primary' | 'secondary' | 'tertiary';

export type FontMode = 'darkBackground' | 'lightBackground';

export interface TextProps {
  fontColor: FontColor;
  fontMode: FontMode;
  fontStyle: FontStyle;
}

export function getTextClassNames(props: TextProps): ClassValue {
  return classnames(
    getFontModeClassNames(props.fontMode),
    `FontColor-${props.fontColor}`,
    `FontStyle-${props.fontStyle}`,
  );
}
