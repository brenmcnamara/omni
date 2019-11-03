import './MarkdownContent.css';

import classnames from 'classnames';
import React from 'react';
import Text from '../Text';

import { ClassValue } from 'classnames/types';

interface Classes {
  root?: ClassValue;
}

interface Props {
  children?: React.ReactNode;
  classes?: Classes;
}

const MarkdownContent: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={classnames(
        'MarkdownContent-root',
        props.classes && props.classes.root,
      )}
    >
      {props.children}
    </div>
  );
};

export default MarkdownContent;

// SECTION SELECTOR

type MarkdownSectionType = 'P' | 'H1' | 'H2' | 'H3';

type MarkdownInlineType = 'BOLD' | 'ITALICS' | 'UNDERLINE';

interface SectionSelector$Props {
  selectedType: MarkdownSectionType;
}

const SectionSelector: React.FC<SectionSelector$Props> = (
  props: SectionSelector$Props,
) => {
  return (
    <div className="MarkdownContent-sectionLabel">
      <div
        className={classnames({
          'MarkdownContent-sectionSelector': true,
        })}
      >
        <Text fontColorStyle="primary" fontStyle="doc-h3">
          {props.selectedType}
        </Text>
      </div>
    </div>
  );
};

// TAGS

interface Tags$Props {
  tags: string[];
}

export const Tags: React.FC<Tags$Props> = (props: Tags$Props) => {
  return (
    <div className="MarkdownContent-section">
      <div className="MarkdownContent-sectionLabel">
        <Text fontColorStyle="secondary" fontStyle="doc-h3">
          {'#'}
        </Text>
      </div>
      <div className="MarkdownContent-sectionContent">
        {props.tags.map(tag => (
          <div className={classnames('MarkdownContent-tags')} key={tag}>
            <Tag tag={tag} />
          </div>
        ))}
      </div>
    </div>
  );
};

interface Tag$Props {
  tag: string;
}

const Tag: React.FC<Tag$Props> = (props: Tag$Props) => {
  return (
    <div className={classnames('MarkdownContent-tags-tagContainer')}>
      <span className={classnames('MarkdownContent-tags-tag')}>
        <Text fontColorStyle="secondary" fontStyle="doc-p">
          {props.tag}
        </Text>
      </span>
    </div>
  );
};

// PARAGRAPH

interface P$Props {
  children?: React.ReactNode;
}

export const P: React.FC<P$Props> = (props: P$Props) => {
  return (
    <div className="MarkdownContent-section">
      <SectionSelector selectedType="P" />
      <div className="MarkdownContent-sectionContent">
        <Text fontColorStyle="secondary" fontStyle="doc-p">
          {props.children}
        </Text>
      </div>
    </div>
  );
};
