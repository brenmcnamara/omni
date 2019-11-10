import './FileTreeItem.css';

import classnames from 'classnames';
import getThemeClassName from '../themes/getThemeClassName';
import React from 'react';
import useTheme from '../themes/useTheme';

import { ClassValue } from 'classnames/types';
import { plus } from '../icons';
import { ThemedIcon } from '../Icon';
import { ThemedText } from '../text';

interface Classes {
  root?: ClassValue;
}

interface Props {
  classes?: Classes;
}

const CreateFileItem: React.FC<Props> = (props: Props) => {
  const theme = useTheme()[0];
  const themeClassName = getThemeClassName(theme);

  return (
    <div
      className={classnames(
        'FileTreeItem-root',
        'margin-bottom-4',
        'margin-horiz-8',
        'padding-horiz-8',
        themeClassName,
        props.classes && props.classes.root,
      )}
    >
      <div className="FileTreeItem-background" />
      <div className="FileTreeItem-container">
        <div className="FileTreeItem-spacer" />
        <div className="FileTreeItem-iconContainer">
          <ThemedIcon icon={plus} size="icon-size-12" />
        </div>

        <div className={classnames('margin-left-12', 'FileTreeItem-name')}>
          <ThemedText fontColor="primary" fontStyle="primary">
            {'New File'}
          </ThemedText>
        </div>
      </div>
    </div>
  );
};

export default CreateFileItem;
