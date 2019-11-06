import './Icon.css';

import classnames from 'classnames';
import getThemeClassName from './themes/getThemeClassName';
import mergeClasses from './mergeClasses';
import React from 'react';
import useTheme from './themes/useTheme';

import { ClassValue } from 'classnames/types';

interface Classes {
  root?: ClassValue;
}

interface Props {
  alt: string;
  classes?: Classes;
  source: string;
}

const Icon: React.FC<Props> = (props: Props) => {
  return (
    <img
      alt={props.alt}
      className={classnames('Icon', props.classes && props.classes.root)}
      src={props.source}
    />
  );
};

export default Icon;

export const ThemedIcon: React.FC<Props> = (props: Props) => {
  const theme = useTheme()[0];
  return (
    <Icon
      {...props}
      classes={mergeClasses(props.classes, {
        root: classnames(getThemeClassName(theme)),
      })}
    />
  );
};
