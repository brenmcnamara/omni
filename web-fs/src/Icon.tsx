import classnames from 'classnames';
import React from 'react';

import { ClassValue } from 'classnames/types';
import { Theme } from './theme/Theme';
import { useTheme } from './theme';

const IconSizeClassNameMap = {
  4: 'icon-size-4',
  6: 'icon-size-6',
  8: 'icon-size-8',
  12: 'icon-size-12',
  16: 'icon-size-16',
  20: 'icon-size-20',
  40: 'icon-size-40',
};

type IconColor = 'primary' | 'white' | 'black';

type IconSize = keyof typeof IconSizeClassNameMap;

interface Classes {
  root?: ClassValue;
}

interface Props {
  classes?: Classes;
  icon: string;
  iconColor: IconColor;
  size: IconSize;
}

const Icon: React.FC<Props> = (props: Props) => {
  const { theme } = useTheme()[0];

  return (
    <i
      className={classnames(
        IconSizeClassNameMap[props.size],
        props.icon,
        getClassNamesForTheme(theme, props),
        props.classes && props.classes.root,
        'icon',
      )}
    />
  );
};

export default Icon;

function getClassNamesForTheme(theme: Theme, props: Props) {
  switch (props.iconColor) {
    case 'primary':
      return theme.iconColor;
    case 'black':
      return 'icon-color-black';
    case 'white':
      return 'icon-color-white';
  }
}
