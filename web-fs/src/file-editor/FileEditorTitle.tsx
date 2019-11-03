import './FileEditorTitle.css';

import classnames from 'classnames';
import getThemeClassName from '../themes/getThemeClassName';
import React from 'react';
import useTheme from '../themes/useTheme';

import { ThemedText } from '../Text';

interface Props {
  title: string;
}

const FileEditorTitle: React.FC<Props> = (props: Props) => {
  const theme = useTheme()[0];
  return (
    <div
      className={classnames(
        'FileEditorTitle-root',
        'padding-bottom-12',
        'border-bottom',
        getThemeClassName(theme),
      )}
    >
      <ThemedText fontColorStyle="primary" fontStyle="heavy">
        {props.title}
      </ThemedText>
    </div>
  );
};

export default FileEditorTitle;
