import classnames from 'classnames';
import FileTreeItem from './FileTreeItem';
import fileTreeStyles from './FileTree.module.css';
import GroupTreeItem from './GroupTreeItem';
import nullthrows from 'nullthrows';
import React from 'react';
import Text from '../text';

import { DocTree, State as State$DocTree } from '../store/docTree.reducer';
import { fileWord } from '../icons';
import { selectDocument } from '../store/actions';
import { State as State$EditMode } from '../store/editMode.reducer';
import { useDispatch, useSelector } from '../store';

interface Props {}

const FileTree: React.FC<Props> = (props: Props) => {
  const { docTree } = useSelection();
  const dispatch = useDispatch();

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

  function onClickNode(nodeID: string) {
    const node = docTree.tree[nodeID];
    if (!node) {
      throw Error(`Cannot find node with id: ${nodeID}`);
    }

    switch (node.type) {
      case 'ATOMIC':
        dispatch(selectDocument(node.documentRef));
        break;

      case 'COMPOSITE':
        // TODO: IMPLEMENT ME!
        break;
    }
  }

  return (
    <div className={fileTreeStyles.root}>
      {docTree.orderedRootIDs.map(id => (
        <FileTreeRecurse
          indent={0}
          key={id}
          nodeID={id}
          nodeMap={docTree.tree}
          onClickNode={onClickNode}
          selectedNodeIDs={[]}
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
  onClickNode: (nodeID: string) => void;
  selectedNodeIDs: string[];
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
          isSelected={props.selectedNodeIDs.includes(nodeID)}
          name={node.name}
          onClick={() => props.onClickNode(node.id)}
        />
      );
    }

    case 'COMPOSITE': {
      return (
        <>
          <GroupTreeItem
            indent={indent}
            isOpen={true}
            name={node.name}
            onClick={() => props.onClickNode(node.id)}
          />
          {node.orderedChildNodeIDs.map(id => (
            <FileTreeRecurse
              indent={indent + 1}
              key={id}
              nodeID={id}
              nodeMap={nodeMap}
              onClickNode={props.onClickNode}
              selectedNodeIDs={props.selectedNodeIDs}
            />
          ))}
        </>
      );
    }
  }
}

interface Selection {
  docTree: State$DocTree;
  editMode: State$EditMode;
}

function useSelection(): Selection {
  return useSelector(state => ({
    docTree: state.docTree,
    editMode: state.editMode,
  }));
}
