import classnames from 'classnames';
import pageLayoutStyles from './PageLayout.module.css';
import React from 'react';

import { ClassValue } from 'classnames/types';
import { useTheme } from '../theme';

interface Classes {
  root?: ClassValue;
}

interface Props {
  children?: React.ReactNode;
  classes?: Classes;
}

const LeftPane: React.FC<Props> = (props: Props) => {
  const { theme } = useTheme()[0];

  return (
    <div
      className={classnames(
        theme.borderColor,
        pageLayoutStyles.leftPane,
        props.classes && props.classes.root,
        'border-right-lg',
      )}
    >
      <div className="PageLayout-LeftPaneContent">{props.children}</div>
    </div>
  );
};

export default LeftPane;
