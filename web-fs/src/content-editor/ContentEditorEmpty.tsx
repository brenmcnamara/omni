import contentEditorStyles from './ContentEditor.module.css';
import React from 'react';
import Text from '../text/Text';

interface Props {}

const ContentEditorEmpty: React.FC<Props> = (props: Props) => {
  return (
    <div className={contentEditorStyles.root}>
      <Text font="primary" fontColor="primary">
        {'No Document is selected'}
      </Text>
    </div>
  );
};

export default ContentEditorEmpty;
