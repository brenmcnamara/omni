import './FileTreeItem.css';

import classnames from 'classnames';
import getThemeClassName from '../themes/getThemeClassName';
import Icon from '../Icon';
import React from 'react';
import useTheme from '../themes/useTheme';

import { arrowRight, more } from '../icons';
import { ClassValue } from 'classnames/types';
import { ThemedText } from '../Text';

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
        <Icon
          alt="Group Open / Close Indication"
          classes={{
            root: classnames({
              'img-size-6': true,
              'FileTreeItem-icon': true,
              'FileTreeItem-icon-rotate': props.isOpen,
              [themeClassName]: true,
            }),
          }}
          source={arrowRight}
        />
        <div className={classnames('margin-left-12', 'FileTreeItem-name')}>
          <ThemedText fontColorStyle="primary" fontStyle="primary">
            {props.name}
          </ThemedText>
        </div>
        <Icon
          alt="Show Group Context Menu"
          classes={{
            root: classnames(
              'FileTreeItem-more',
              'img-size-12',
              themeClassName,
            ),
          }}
          source={more}
        />
      </div>
    </div>
  );
};

export default GroupTreeItem;
