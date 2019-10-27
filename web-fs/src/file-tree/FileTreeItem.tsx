import './FileTreeItem.css';

import classnames from 'classnames';
import React from 'react';

import { more } from '../icons';

interface Props {
  className?: string;
  icon: string;
  indent: number;
  isSelected: boolean;
  name: string;
}

const INDENT_SIZE_PX = 24;

const FileTreeItem: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={classnames({
        [props.className || '']: Boolean(props.className),
        'FileTreeItem-root': true,
        'FileTreeItem-selected': props.isSelected,
        'margin-horiz-8': true,
        'padding-horiz-8': true,
      })}
    >
      <div
        className="FileTreeItem-spacer"
        style={{ backgroundColor: 'red', width: props.indent * INDENT_SIZE_PX }}
      />
      <img
        className={classnames({
          'img-size-16': true,
          'img-white': props.isSelected,
        })}
        src={props.icon}
      />
      <p className={classnames('FileTreeItem-name', 'margin-left-12')}>
        {props.name}
      </p>
      <img
        className={classnames({
          'FileTreeItem-more': true,
          'img-size-20': true,
          'img-white': props.isSelected,
        })}
        src={more}
      />
    </div>
  );
};

export default FileTreeItem;
