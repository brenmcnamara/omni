import classnames from 'classnames';
import FileTreeItem from './FileTreeItem';
import fileTreeStyles from './FileTree.module.css';
import GroupTreeItem from './GroupTreeItem';
import React from 'react';
import Text from '../text';

import { DocTree } from '../store/docTree.reducer';
import { fileWord, sketch } from '../icons';
import { useSelector } from '../store';

interface Props {}

const FileTree: React.FC<Props> = (props: Props) => {
  const docTree = useSelector(state => state.docTree);

  if (docTree.tree.length === 0) {
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

  // TODO: Should we be enforcing that files have unique names among their
  // siblings. This is the assumption here with the key being used as the name.
  // May consider using the file id here.
  return (
    <div className={fileTreeStyles.root}>
      {docTree.tree.map(node => (
        <FileTreeRecurse
          docTree={node}
          indent={0}
          key={node.name}
          path={node.name}
        />
      ))}
    </div>
  );
};

export default FileTree;

interface RecurseProps {
  docTree: DocTree;
  indent: number;
  path: string;
}

function FileTreeRecurse(props: RecurseProps) {
  const { docTree, indent, path } = props;

  switch (docTree.type) {
    case 'ATOMIC': {
      return (
        <FileTreeItem
          icon={fileWord}
          indent={indent}
          isSelected={false}
          name={docTree.name}
        />
      );
    }

    case 'COMPOSITE': {
      return (
        <>
          <GroupTreeItem indent={indent} isOpen={true} name={docTree.name} />
          {docTree.childNodes.map(node => (
            <FileTreeRecurse
              docTree={node}
              indent={indent + 1}
              key={`${path}/${node.name}`}
              path={`${path}/${node.name}`}
            />
          ))}
        </>
      );
    }
  }
}
