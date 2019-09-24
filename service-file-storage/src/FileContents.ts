export interface FileContents<TContentType extends FileContentType> {
  contentType: TContentType;
  data: ArrayBuffer;
}

export type FileContentType = FileContentType$Plain | FileContentType$TreeBased;

export type FileContentType$TreeBased = 'text/xml' | 'text/html' | 'text/md';

export type FileContentType$Plain = 'text/plain';
