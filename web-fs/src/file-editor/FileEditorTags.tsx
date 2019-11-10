import './FileEditor.css';

import classnames from 'classnames';
import getThemeClassName from '../themes/getThemeClassName';
import React from 'react';
import useTheme from '../themes/useTheme';

import { ThemedText } from '../Text';

// TAGS

interface Tags$Props {
  tags: string[];
}

const Tags: React.FC<Tags$Props> = (props: Tags$Props) => {
  return (
    <div className="FileEditorSection-root">
      <div className="FileEditorSection-label">
        <ThemedText fontColorStyle="secondary" fontStyle="doc-h3">
          {'#'}
        </ThemedText>
      </div>
      <div className="FileEditorSection-content">
        {props.tags.map(tag => (
          <div className={classnames('FileEditorTags-root')} key={tag}>
            <Tag tag={tag} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;

interface Tag$Props {
  tag: string;
}

const Tag: React.FC<Tag$Props> = (props: Tag$Props) => {
  const theme = useTheme()[0];
  return (
    <div className={classnames('FileEditorTags-container')}>
      <span
        className={classnames('FileEditorTags-tag', getThemeClassName(theme))}
      >
        <ThemedText fontColorStyle="secondary" fontStyle="doc-p">
          {props.tag}
        </ThemedText>
      </span>
    </div>
  );
};
