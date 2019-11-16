import './FileTreeItem.css';

import classnames from 'classnames';
import Icon from '../Icon';
import React from 'react';
import Text from '../text';
// import useTheme from '../theme/useTheme';

import { arrowDown, arrowRight, ellipsisH } from '../icons';
import { ClassValue } from 'classnames/types';

interface Classes {
  root?: ClassValue;
}

interface Props {
  classes?: Classes;
  indent: number;
  isOpen: boolean;
  name: string;
}

const INDENT_SIZE_PX = 24;

const GroupTreeItem: React.FC<Props> = (props: Props) => {
  // const theme = useTheme()[0];

  return (
    <div
      className={classnames(
        'FileTreeItem-root',
        'margin-bottom-4',
        'margin-horiz-8',
        'padding-horiz-8',
        props.classes && props.classes.root,
      )}
    >
      <div className="FileTreeItem-background" />
      <div className="FileTreeItem-container">
        <div
          className="FileTreeItem-spacer"
          style={{ width: props.indent * INDENT_SIZE_PX }}
        />
        <div className="FileTreeItem-iconContainer">
          <Icon icon={props.isOpen ? arrowDown : arrowRight} size={16} />
        </div>
        <div className={classnames('margin-left-12', 'FileTreeItem-name')}>
          <Text font="primary">{props.name}</Text>
        </div>
        <Icon
          classes={{ root: 'icon-color-white' }}
          icon={ellipsisH}
          size={12}
        />
      </div>
    </div>
  );
};

export default GroupTreeItem;
