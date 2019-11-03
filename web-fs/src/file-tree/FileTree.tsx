import './FileTree.css';

import FileTreeItem from './FileTreeItem';
import React from 'react';

import { connections, document, diamond, folder } from '../icons';

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
        name="Group Hooks"
      />
      <FileTreeItem
        icon={document}
        indent={1}
        isSelected={false}
        name="True Seeker"
      />
      <FileTreeItem icon={folder} indent={0} isSelected={false} name="Books" />
      <FileTreeItem
        icon={folder}
        indent={0}
        isSelected={false}
        name="Designs"
      />
      <FileTreeItem
        icon={document}
        indent={1}
        isSelected={false}
        name="Group Hooks"
      />
      <FileTreeItem icon={diamond} indent={1} isSelected={false} name="Findi" />
      <FileTreeItem
        icon={diamond}
        indent={1}
        isSelected={false}
        name="HiddenWords"
      />
      <FileTreeItem
        icon={connections}
        indent={0}
        isSelected={false}
        name="Connections"
      />
    </div>
  );
};

export default FileTree;
