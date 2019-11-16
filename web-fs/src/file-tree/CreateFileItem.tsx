import './FileTreeItem.css';

import classnames from 'classnames';
import Icon from '../Icon';
import React from 'react';
import Text from '../text';
import useTheme from '../theme/useTheme';

import { ClassValue } from 'classnames/types';
import { plus } from '../icons';

interface Classes {
  root?: ClassValue;
}

interface Props {
  classes?: Classes;
}

const CreateFileItem: React.FC<Props> = (props: Props) => {
  const { theme } = useTheme()[0];

  return (
    <div
      className={classnames(
        'FileTreeItem-root',
        'margin-bottom-4',
        'margin-horiz-8',
        'padding-horiz-8',
        theme.fontColorPrimary,
        props.classes && props.classes.root,
      )}
    >
      <div className="FileTreeItem-background" />
      <div className="FileTreeItem-container">
        <div className="FileTreeItem-spacer" />
        <div className="FileTreeItem-iconContainer">
          <Icon icon={plus} size={12} />
        </div>

        <div className={classnames('margin-left-12', 'FileTreeItem-name')}>
          <Text
            classes={{
              root: classnames(theme.fontColorPrimary),
            }}
            font="primary"
          >
            {'New File'}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default CreateFileItem;
