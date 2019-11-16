import pageLayoutStyles from './PageLayout.module.css';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const RightPane: React.FC<Props> = (props: Props) => {
  return (
    <div className={pageLayoutStyles.rightPane}>
      <div className="PageLayout-RightPaneContent">{props.children}</div>
    </div>
  );
};

export default RightPane;
