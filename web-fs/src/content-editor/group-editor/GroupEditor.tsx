import groupEditorStyles from './GroupEditor.module.css';
import React from 'react';

interface Props {
  onChangeGroups: (groups: string[]) => void;
  groups: string[];
}

const GroupEditor: React.FC<Props> = (props: Props) => {
  return <div className={groupEditorStyles.root}></div>;
};

export default GroupEditor;
