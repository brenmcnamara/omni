import './Icon.css';

import classnames from 'classnames';
import React from 'react';
import useTheme from './themes/useTheme';

export type IconSize =
  | 'icon-size-12'
  | 'icon-size-16'
  | 'icon-size-20'
  | 'icon-size-40';

export type IconColor = 'icon-color-white' | 'icon-color-black';

interface Props {
  color: IconColor;
  icon: string;
  size: IconSize;
}

const Icon: React.FC<Props> = (props: Props) => {
  return (
    <i className={classnames('icon', props.icon, props.color, props.size)} />
  );
};

export default Icon;

type ThemedIcon$Props = Omit<Props, 'color'>;

export const ThemedIcon: React.FC<ThemedIcon$Props> = (
  props: ThemedIcon$Props,
) => {
  const theme = useTheme()[0];
  return (
    <Icon
      {...props}
      color={theme === 'Dark' ? 'icon-color-white' : 'icon-color-black'}
    />
  );
};
