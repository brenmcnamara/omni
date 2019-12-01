import './ContentViewer.css';

import React from 'react';
import Text from '../text/Text';

interface Props {}

const ContentViewerEmpty: React.FC<Props> = (props: Props) => {
  return (
    <div className="ContentViewer-empty">
      <Text font="primary" fontColor="primary">
        {'No Document is selected'}
      </Text>
    </div>
  );
};

export default ContentViewerEmpty;
