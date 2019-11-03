type Ref<TType extends string> = {};

export interface Document<TExt extends string> {
  ext: string;
  name: string;
}

export interface DocumentTreeNode {
  documentRefs: Array<Document<string>>;
  name: string;
  parentGroup: Ref<'DocumentTreeNode'> | null;
}

export interface DocumentContent {
  blob: Blob;
  documentRef: Ref<'Document'>;
}
