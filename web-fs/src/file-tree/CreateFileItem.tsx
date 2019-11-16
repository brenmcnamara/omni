import './FileTreeItem.css';

import classnames from 'classnames';
import Icon from '../Icon';
import React from 'react';
import Text from '../text';

import { ClassValue } from 'classnames/types';
import { plus } from '../icons';

interface Classes {
  root?: ClassValue;
}

interface Props {
  classes?: Classes;
}

const CreateFileItem: React.FC<Props> = (props: Props) => {
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
        <div className="FileTreeItem-spacer" />
        <div className="FileTreeItem-iconContainer">
          <Icon icon={plus} iconColor="primary" size={12} />
        </div>

        <div className={classnames('margin-left-12', 'FileTreeItem-name')}>
          <Text font="primary" fontColor="primary">
            {'New File'}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default CreateFileItem;
