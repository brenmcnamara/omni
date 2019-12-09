import classnames from 'classnames';
import contentAnnotationStyles from './ContentAnnotation.module.css';
import Icon from '../../Icon';
import React from 'react';

import { hashTag } from '../../icons';

export type ContentAnnotationType = 'P' | 'TAG';

interface Props {
  type: ContentAnnotationType;
}

const ContentAnnotation: React.FC<Props> = (props: Props) => {
  let content: React.ReactNode;

  switch (props.type) {
    case 'TAG':
      content = <Icon icon={hashTag} iconColor="primary" size={12} />;
      break;

    case 'P':
      throw Error('P annotation not yet supported');
  }

  return (
    <div
      className={classnames(
        contentAnnotationStyles.root,
        getAnnotationTypeClassName(props.type),
      )}
    >
      {content}
    </div>
  );
};

export default ContentAnnotation;

function getAnnotationTypeClassName(type: ContentAnnotationType): string {
  switch (type) {
    case 'P':
      return contentAnnotationStyles.typeP;

    case 'TAG':
      return contentAnnotationStyles.typeTag;
  }
}
