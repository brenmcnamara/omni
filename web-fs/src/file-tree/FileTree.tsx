import classnames from 'classnames';
import FileTreeItem from './FileTreeItem';
import fileTreeStyles from './FileTree.module.css';
import GroupTreeItem from './GroupTreeItem';
import nullthrows from 'nullthrows';
import React from 'react';
import Text from '../text';

import { DocTree } from '../store/docTree.reducer';
import { fileWord } from '../icons';
import { useSelector } from '../store';

interface Props {}

const FileTree: React.FC<Props> = (props: Props) => {
  const docTree = useSelector(state => state.docTree);

  if (Object.keys(docTree.tree).length === 0) {
    return (
      <div className={fileTreeStyles.root}>
        <div className={classnames('padding-top-12', fileTreeStyles.empty)}>
          <Text font="primary" fontColor="secondary">
            {'You have no files yet'}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={fileTreeStyles.root}>
      {docTree.orderedRootIDs.map(id => (
        <FileTreeRecurse
          indent={0}
          key={id}
          nodeID={id}
          nodeMap={docTree.tree}
        />
      ))}
    </div>
  );
};

export default FileTree;

interface RecurseProps {
  indent: number;
  nodeID: string;
  nodeMap: { [id: string]: DocTree };
}

function FileTreeRecurse(props: RecurseProps) {
  const { nodeID, nodeMap, indent } = props;

  const node = nullthrows(nodeMap[nodeID]);

  switch (node.type) {
    case 'ATOMIC': {
      return (
        <FileTreeItem
          icon={fileWord}
          indent={indent}
          isSelected={false}
          name={node.name}
        />
      );
    }

    case 'COMPOSITE': {
      return (
        <>
          <GroupTreeItem indent={indent} isOpen={true} name={node.name} />
          {node.orderedChildNodeIDs.map(id => (
            <FileTreeRecurse
              indent={indent + 1}
              key={id}
              nodeID={id}
              nodeMap={nodeMap}
            />
          ))}
        </>
      );
    }
  }
}
