import classnames from 'classnames';
import React from 'react';

import { ClassValue } from 'classnames/types';

const IconSizeClassNameMap = {
  4: 'icon-size-4',
  6: 'icon-size-6',
  8: 'icon-size-8',
  12: 'icon-size-12',
  16: 'icon-size-16',
  20: 'icon-size-20',
  40: 'icon-size-40',
};

type IconSize = keyof typeof IconSizeClassNameMap;

interface Classes {
  root?: ClassValue;
}

interface Props {
  classes?: Classes;
  icon: string;
  size: IconSize;
}

const Icon: React.FC<Props> = (props: Props) => {
  return (
    <i
      className={classnames(
        IconSizeClassNameMap[props.size],
        props.icon,
        props.classes && props.classes.root,
        'icon',
      )}
    />
  );
};

export default Icon;
