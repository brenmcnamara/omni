import classnames from 'classnames';
import ContentAnnotation from './ContentAnnotation';
import contentAnnotationGutterStyles from './ContentAnnotationGutter.module.css';
import fontStyles from '../../text/Font.module.css';
import groupEditorStyles from './GroupEditor.module.css';
import React from 'react';

import { useTheme } from '../../theme';

interface Props {
  groups: string[];
  onChange: (groups: string[]) => void;
}

const GroupEditor: React.FC<Props> = (props: Props) => {
  const { theme } = useTheme()[0];

  return (
    <div className={classnames(groupEditorStyles.root, 'padding-top-12')}>
      <div className={contentAnnotationGutterStyles.root}>
        <ContentAnnotation type="TAG" />
      </div>
      <div
        className={classnames(
          fontStyles.docP,
          theme.fontColorPrimary,
          groupEditorStyles.content,
        )}
        contentEditable={true}
      >
        {'Hello World'}
      </div>
    </div>
  );
};

export default GroupEditor;
