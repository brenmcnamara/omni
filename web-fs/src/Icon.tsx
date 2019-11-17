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

type IconColor = 'primary' | 'selected' | 'white' | 'black';

type IconSize = keyof typeof IconSizeClassNameMap;

interface Classes {
  icon?: ClassValue;
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
    <span
      className={classnames(
        props.classes && props.classes.root,
        getClassNamesForTheme(theme, props),
        'icon',
      )}
      style={{
        width: `${props.size}px`,
        height: `${props.size}px`,
        backgroundColor: '#aaa',
      }}
    >
      <i
        className={classnames(
          IconSizeClassNameMap[props.size],
          props.icon,
          props.classes && props.classes.icon,
        )}
      />
    </span>
  );
};

export default Icon;

function getClassNamesForTheme(theme: Theme, props: Props): string {
  switch (props.iconColor) {
    case 'primary':
      return theme.iconColor;
    case 'selected':
      return theme.colorSelectionPrimary;
    case 'black':
      return 'icon-color-black';
    case 'white':
      return 'icon-color-white';
  }
}
