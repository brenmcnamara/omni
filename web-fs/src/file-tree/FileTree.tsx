import FileTreeItem from './FileTreeItem';
import fileTreeStyles from './FileTree.module.css';
import GroupTreeItem from './GroupTreeItem';
import React from 'react';

import { fileWord, sketch } from '../icons';
import { useSelector } from '../store';

interface Props {}

const FileTree: React.FC<Props> = (props: Props) => {
  const docTree = useSelector(state => state.docTree);

  return (
    <div className={fileTreeStyles.root}>
      <GroupTreeItem indent={0} isOpen={false} name="9point" />
      <GroupTreeItem indent={0} isOpen={true} name="Bahá'i" />
      <FileTreeItem
        icon={fileWord}
        indent={1}
        isSelected={true}
        name="True Seeker"
      />
      <GroupTreeItem indent={0} isOpen={false} name="Books" />
      <GroupTreeItem indent={0} isOpen={true} name="Designs" />
      <FileTreeItem icon={sketch} indent={1} isSelected={false} name="Findi" />
      <FileTreeItem
        icon={sketch}
        indent={1}
        isSelected={false}
        name="HiddenWords"
      />
    </div>
  );
};

export default FileTree;
