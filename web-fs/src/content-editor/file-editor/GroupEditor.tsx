import classnames from 'classnames';
import contentAnnotationGutterStyles from './ContentAnnotationGutter.module.css';
import groupEditorStyles from './GroupEditor.module.css';
import React from 'react';
import Text from '../../text';

interface Props {
  groups: string[];
  onChange: (groups: string[]) => void;
}

const GroupEditor: React.FC<Props> = (props: Props) => {
  return (
    <div className={classnames(groupEditorStyles.root, 'padding-top-12')}>
      <div className={contentAnnotationGutterStyles.root}></div>
      <div className={groupEditorStyles.content}>
        <Text font="docP" fontColor="primary">
          {'Hello World'}
        </Text>
      </div>
    </div>
  );
};

export default GroupEditor;
