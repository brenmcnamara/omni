import pageLayoutStyles from './PageLayout.module.css';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const Toolbar: React.FC<Props> = (props: Props) => {
  return <div className={pageLayoutStyles.toolbar}>{props.children}</div>;
};

export default Toolbar;
