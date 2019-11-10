import './FileEditor.css';
import './MarkdownContent.css';

import classnames from 'classnames';
import React from 'react';

import { ClassValue } from 'classnames/types';
import { ThemedText } from '../text';

interface Classes {
  root?: ClassValue;
}

interface Props {
  children?: React.ReactNode;
  classes?: Classes;
}

// SECTION SELECTOR

type MarkdownSectionType = 'P' | 'H1' | 'H2' | 'H3';

interface SectionSelector$Props {
  selectedType: MarkdownSectionType;
}

const SectionSelector: React.FC<SectionSelector$Props> = (
  props: SectionSelector$Props,
) => {
  return (
    <div className="FileEditorSection-label">
      <div
        className={classnames({
          'FileEditorSection-selector': true,
        })}
      >
        <ThemedText fontColor="primary" fontStyle="doc-h3">
          {props.selectedType}
        </ThemedText>
      </div>
    </div>
  );
};

// PARAGRAPH

interface P$Props {
  children?: React.ReactNode;
}

export const P: React.FC<P$Props> = (props: P$Props) => {
  return (
    <div className="FileEditorSection-root">
      <SectionSelector selectedType="P" />
      <div className="FileEditorSection-content">
        <ThemedText fontColor="secondary" fontStyle="doc-p">
          {props.children}
        </ThemedText>
      </div>
    </div>
  );
};
