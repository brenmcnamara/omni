import './FileTreeItem.css';

import classnames from 'classnames';
import getThemeClassName from '../themes/getThemeClassName';
import Icon, { ThemedIcon } from '../Icon';
import React from 'react';
import Text, { ThemedText } from '../text';
import useTheme from '../themes/useTheme';

import { ellipsisH } from '../icons';

interface Props {
  className?: string;
  icon: string;
  indent: number;
  isSelected: boolean;
  name: string;
}

const INDENT_SIZE_PX = 24;

const FileTreeItem: React.FC<Props> = (props: Props) => {
  const theme = useTheme()[0];
  const themeClassName = getThemeClassName(theme);

  return (
    <div
      className={classnames({
        [props.className || '']: Boolean(props.className),
        'FileTreeItem-root': true,
        'FileTreeItem-selected': props.isSelected,
        'margin-bottom-4': true,
        'margin-horiz-8': true,
        'padding-horiz-8': true,
        [themeClassName]: true,
      })}
    >
      <div className="FileTreeItem-background" />
      <div className="FileTreeItem-container">
        <div
          className="FileTreeItem-spacer"
          style={{
            width: props.indent * INDENT_SIZE_PX,
          }}
        />
        <div className="FileTreeItem-iconContainer">
          <ThemedIcon size="icon-size-16" icon={props.icon} />
        </div>
        <div className={classnames('margin-left-12', 'FileTreeItem-name')}>
          {props.isSelected && (
            <Text
              fontColor="primary"
              fontMode="darkBackground"
              fontStyle="primary"
            >
              {props.name}
            </Text>
          )}
          {!props.isSelected && (
            <ThemedText fontColor="primary" fontStyle="primary">
              {props.name}
            </ThemedText>
          )}
        </div>
        <Icon color="icon-color-white" icon={ellipsisH} size="icon-size-12" />
      </div>
    </div>
  );
};

export default FileTreeItem;
