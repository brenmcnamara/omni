import './FileTree.css';

import FileTreeItem from './FileTreeItem';
import React from 'react';

import { document, diamond, folder } from '../icons';

interface Props {}

const FileTree: React.FC<Props> = (props: Props) => {
  return (
    <div className="FileTree-root">
      <FileTreeItem icon={folder} indent={0} isSelected={false} name="9point" />
      <FileTreeItem icon={folder} indent={0} isSelected={false} name="Bahá'i" />
      <FileTreeItem
        icon={document}
        indent={1}
        isSelected={true}
        name="True Seeker"
      />
      <FileTreeItem icon={folder} indent={0} isSelected={false} name="Books" />
      <FileTreeItem
        icon={folder}
        indent={0}
        isSelected={false}
        name="Designs"
      />
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
