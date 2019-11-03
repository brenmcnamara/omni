import './FileEditorTitle.css';

import React from 'react';

interface Props {
  title: string;
}

const FileEditorTitle: React.FC<Props> = (props: Props) => {
  return (
    <div className="FileEditorTitle-root">
      <h1>{props.title}</h1>
    </div>
  );
};

export default FileEditorTitle;
