import './FileEditor.css';

import classnames from 'classnames';
import getThemeClassName from '../themes/getThemeClassName';
import React from 'react';
import useTheme from '../themes/useTheme';

import { ThemedText } from '../text';

// TAGS

interface Tags$Props {
  tags: string[];
}

const Tags: React.FC<Tags$Props> = (props: Tags$Props) => {
  return (
    <div className="FileEditorProtoSection-root">
      <div className="FileEditorProtoSection-label">
        <ThemedText fontColor="secondary" fontStyle="doc-h3">
          {'#'}
        </ThemedText>
      </div>
      <div className="FileEditorProtoSection-content">
        {props.tags.map(tag => (
          <div className={classnames('FileEditorProtoTags-root')} key={tag}>
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
    <div className={classnames('FileEditorProtoTags-container')}>
      <span
        className={classnames('FileEditorProtoTags-tag', getThemeClassName(theme))}
      >
        <ThemedText fontColor="secondary" fontStyle="doc-p">
          {props.tag}
        </ThemedText>
      </span>
    </div>
  );
};
