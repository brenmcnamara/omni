import Icon from '../Icon';
import React from 'react';
import ToolbarButton from '../page-layout/ToolbarButton';

import { addDocument, selectDocument } from '../store/actions';
import {
  createLocal as createDocumentLocal,
  createRef as createDocumentRef,
} from '../store/Document.model';
import { plus } from '../icons';
import { useDispatch, useSelector } from '../store';

interface Props {}

const CreateFileToolbarButton: React.FC = (props: Props) => {
  const dispatch = useDispatch();

  function onClick() {
    const documentLocal = createDocumentLocal({
      groups: [],
      name: 'Untitled Document',
    });
    dispatch(addDocument(documentLocal, ''));
    dispatch(selectDocument(createDocumentRef(documentLocal)));
  }

  return (
    <ToolbarButton onClick={onClick}>
      <Icon icon={plus} iconColor="primary" size={16} />
    </ToolbarButton>
  );
};

export default CreateFileToolbarButton;
