import Icon from '../Icon';
import React from 'react';
import ToolbarButton from '../page-layout/ToolbarButton';

import { plus } from '../icons';
import { setEditMode } from '../store/actions';
import { useDispatch, useSelector } from '../store';

interface Props {}

const CreateFileToolbarButton: React.FC = (props: Props) => {
  const isNewDoc = useSelector(state => state.editMode.type === 'NEW_DOCUMENT');
  const dispatch = useDispatch();

  function onClick() {
    if (!isNewDoc) {
      dispatch(setEditMode({ type: 'NEW_DOCUMENT' }));
    }
  }

  return (
    <ToolbarButton onClick={onClick}>
      <Icon icon={plus} iconColor="primary" size={16} />
    </ToolbarButton>
  );
};

export default CreateFileToolbarButton;
