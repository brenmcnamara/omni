import contentAnnotationGutterStyles from './ContentAnnotationGutter.module.css';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const ContentAnnotationGutter: React.FC<Props> = (props: Props) => {
  return (
    <div className={contentAnnotationGutterStyles.root}>{props.children}</div>
  );
};

export default ContentAnnotationGutter;
