import './FileTreeItem.css';

import classnames from 'classnames';
import getThemeClassName from '../themes/getThemeClassName';
import Icon, { ThemedIcon } from '../Icon';
import React from 'react';
import Text from '../Text';
import useTheme from '../themes/useTheme';

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
      <div className="FileTreeItem-container">
        <div
          className="FileTreeItem-spacer"
          style={{
            backgroundColor: 'red',
            width: props.indent * INDENT_SIZE_PX,
          }}
        />
        <Icon
          classes={{
            root: classnames({
              'img-size-16': true,
              'img-white': props.isSelected,
              [themeClassName]: !props.isSelected,
            }),
          }}
          source={props.icon}
        />
        <div className={classnames('margin-left-12', 'FileTreeItem-name')}>
          <Text
            fontColorStyle="primary"
            fontMode={props.isSelected ? 'dark' : 'light'}
            fontStyle="primary"
          >
            {props.name}
          </Text>
        </div>
        {props.isSelected && (
          <Icon
            classes={{
              root: classnames({
                'FileTreeItem-more': true,
                'image-size-12': true,
                'img-white': props.isSelected,
                [themeClassName]: !props.isSelected,
              }),
            }}
            source={more}
          />
        )}
      </div>
      <div className="FileTreeItem-background" />
    </div>
  );
};

export default FileTreeItem;
