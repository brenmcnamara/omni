import Icon from '../Icon';
import React from 'react';
import ToolbarButton from '../page-layout/ToolbarButton';

import { plus } from '../icons';

interface Props {}

const CreateFileToolbarButton: React.FC = (props: Props) => {
  return (
    <ToolbarButton onClick={() => {}}>
      <Icon icon={plus} iconColor="primary" size={16} />
    </ToolbarButton>
  );
};

export default CreateFileToolbarButton;
