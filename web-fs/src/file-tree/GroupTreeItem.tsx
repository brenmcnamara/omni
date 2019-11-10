import './FileTreeItem.css';

import classnames from 'classnames';
import getThemeClassName from '../themes/getThemeClassName';
import Icon, { ThemedIcon } from '../Icon';
import React from 'react';
import useTheme from '../themes/useTheme';

import { arrowDown, arrowRight, ellipsisH } from '../icons';
import { ClassValue } from 'classnames/types';
import { ThemedText } from '../text';

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
  const theme = useTheme()[0];
  const themeClassName = getThemeClassName(theme);

  return (
    <div
      className={classnames(
        'FileTreeItem-root',
        'margin-bottom-4',
        'margin-horiz-8',
        'padding-horiz-8',
        props.classes && props.classes.root,
        themeClassName,
      )}
    >
      <div className="FileTreeItem-background" />
      <div className="FileTreeItem-container">
        <div
          className="FileTreeItem-spacer"
          style={{ width: props.indent * INDENT_SIZE_PX }}
        />
        <div className="FileTreeItem-iconContainer">
          <ThemedIcon
            icon={props.isOpen ? arrowDown : arrowRight}
            size="icon-size-16"
          />
        </div>
        <div className={classnames('margin-left-12', 'FileTreeItem-name')}>
          <ThemedText fontColor="primary" fontStyle="primary">
            {props.name}
          </ThemedText>
        </div>
        <Icon color="icon-color-white" icon={ellipsisH} size="icon-size-12" />
      </div>
    </div>
  );
};

export default GroupTreeItem;
