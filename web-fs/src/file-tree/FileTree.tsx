import classnames from 'classnames';
import FileTreeItem from './FileTreeItem';
import fileTreeStyles from './FileTree.module.css';
import GroupTreeItem from './GroupTreeItem';
import nullthrows from 'nullthrows';
import React from 'react';
import Text from '../text';

import { DocTree, State as State$DocTree } from '../store/docTree.reducer';
import { fileWord } from '../icons';
import { selectActiveNodeIDs } from '../store/selectors';
import { selectDocument } from '../store/actions';
import { State as State$EditMode } from '../store/editMode.reducer';
import { useDispatch, useSelector, StoreState } from '../store';
import { createSelector } from 'reselect';

interface Props {}

const FileTree: React.FC<Props> = (props: Props) => {
  const { activeNodeIDs, docTree } = useSelection();
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
          activeNodeIDs={activeNodeIDs}
        />
      ))}
    </div>
  );
};

export default FileTree;

interface RecurseProps {
  activeNodeIDs: string[];
  indent: number;
  nodeID: string;
  nodeMap: { [id: string]: DocTree };
  onClickNode: (nodeID: string) => void;
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
          isActive={props.activeNodeIDs.includes(nodeID)}
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
              activeNodeIDs={props.activeNodeIDs}
              indent={indent + 1}
              key={id}
              nodeID={id}
              nodeMap={nodeMap}
              onClickNode={props.onClickNode}
            />
          ))}
        </>
      );
    }
  }
}

// -----------------------------------------------------------------------------
// Selection
// -----------------------------------------------------------------------------

interface Selection {
  activeNodeIDs: string[];
  docTree: State$DocTree;
  editMode: State$EditMode;
}

const getSelection = createSelector(
  selectActiveNodeIDs,
  (state: StoreState) => state.docTree,
  (state: StoreState) => state.editMode,
  (
    activeNodeIDs: string[],
    docTree: State$DocTree,
    editMode: State$EditMode,
  ) => {
    return {
      activeNodeIDs,
      docTree,
      editMode,
    };
  },
);

function useSelection(): Selection {
  return useSelector(getSelection);
}
