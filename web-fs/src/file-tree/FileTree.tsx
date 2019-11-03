import './FileTree.css';

import FileTreeItem from './FileTreeItem';
import GroupTreeItem from './GroupTreeItem';
import React from 'react';

import { arrowRight, document, diamond } from '../icons';

interface Props {}

const FileTree: React.FC<Props> = (props: Props) => {
  return (
    <div className="FileTree-root">
      <GroupTreeItem indent={0} isOpen={false} name="9point" />
      <GroupTreeItem indent={0} isOpen={true} name="Bahá'i" />
      <FileTreeItem
        icon={document}
        indent={1}
        isSelected={true}
        name="True Seeker"
      />
      <GroupTreeItem indent={0} isOpen={false} name="Books" />
      <GroupTreeItem indent={0} isOpen={true} name="Designs" />
      <FileTreeItem icon={diamond} indent={1} isSelected={false} name="Findi" />
      <FileTreeItem
        icon={diamond}
        indent={1}
        isSelected={false}
        name="HiddenWords"
      />
    </div>
  );
};

export default FileTree;
