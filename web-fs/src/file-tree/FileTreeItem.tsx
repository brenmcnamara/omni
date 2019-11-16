import './FileTreeItem.css';

import classnames from 'classnames';
import Icon from '../Icon';
import React from 'react';
import Text from '../text';

import { ClassValue } from 'classnames/types';
import { ellipsisH } from '../icons';
import { useTheme } from '../theme';

interface Classes {
  root?: ClassValue;
}

interface Props {
  classes?: Classes;
  icon: string;
  indent: number;
  isSelected: boolean;
  name: string;
}

const INDENT_SIZE_PX = 24;

const FileTreeItem: React.FC<Props> = (props: Props) => {
  const { theme } = useTheme()[0];

  return (
    <div
      className={classnames(props.classes && props.classes.root, {
        'FileTreeItem-root': true,
        'FileTreeItem-selected': props.isSelected,
        'margin-bottom-4': true,
        'margin-horiz-8': true,
        'padding-horiz-8': true,
      })}
    >
      <div
        className={classnames(
          'FileTreeItem-background',
          theme.backgroundColorSelection,
        )}
      />
      <div className="FileTreeItem-container">
        <div
          className="FileTreeItem-spacer"
          style={{
            width: props.indent * INDENT_SIZE_PX,
          }}
        />
        <div className="FileTreeItem-iconContainer">
          <Icon
            icon={props.icon}
            iconColor={props.isSelected ? 'white' : 'primary'}
            size={16}
          />
        </div>
        <div className={classnames('margin-left-12', 'FileTreeItem-name')}>
          <Text
            font="primary"
            fontColor={props.isSelected ? 'white' : 'primary'}
          >
            {props.name}
          </Text>
        </div>
        <Icon icon={ellipsisH} iconColor="white" size={12} />
      </div>
    </div>
  );
};

export default FileTreeItem;
