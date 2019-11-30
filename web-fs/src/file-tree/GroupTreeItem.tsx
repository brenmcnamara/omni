import './FileTreeItem.css';

import classnames from 'classnames';
import Icon from '../Icon';
import React from 'react';
import Text from '../text';

import { arrowDown, arrowRight, ellipsisH } from '../icons';
import { ClassValue } from 'classnames/types';
import { getThemeInfo } from '../store/selectors';
import { useSelector } from '../store';

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
  const theme = useSelector(state => getThemeInfo(state).theme);

  return (
    <div
      className={classnames(
        props.classes && props.classes.root,
        'FileTreeItem-root',
        'margin-bottom-4',
        'margin-horiz-8',
        'padding-horiz-8',
      )}
    >
      <div
        className={classnames(
          'FileTreeItem-background',
          theme.colorSelectionPrimary,
        )}
      />
      <div className="FileTreeItem-container">
        <div
          className="FileTreeItem-spacer"
          style={{ width: props.indent * INDENT_SIZE_PX }}
        />
        <div className="FileTreeItem-iconContainer">
          <Icon
            icon={props.isOpen ? arrowDown : arrowRight}
            iconColor="primary"
            size={16}
          />
        </div>
        <div className={classnames('margin-left-12', 'FileTreeItem-name')}>
          <Text font="primary" fontColor="primary">
            {props.name}
          </Text>
        </div>
        <Icon icon={ellipsisH} iconColor="white" size={12} />
      </div>
    </div>
  );
};

export default GroupTreeItem;
