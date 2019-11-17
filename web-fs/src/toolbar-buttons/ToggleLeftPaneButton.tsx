import Icon from '../Icon';
import React from 'react';
import ToolbarButton from '../page-layout/ToolbarButton';

import { bars } from '../icons';

interface Props {}

const ToggleLeftPaneButton: React.FC<Props> = (props: Props) => {
  return (
    <ToolbarButton onClick={() => {}}>
      <Icon icon={bars} iconColor="primary" size={16} />
    </ToolbarButton>
  );
};

export default ToggleLeftPaneButton;
