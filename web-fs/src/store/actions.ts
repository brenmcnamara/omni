import { Action as _Action } from 'redux';
import { DocumentContent } from './DocumentContent';
import {
  Local as DocumentLocal,
  Model as Document,
  Ref as DocumentRef,
} from './Document.model';
import { State as EditMode } from './editMode.reducer';
import { ThemeType } from '../theme';

export type PureAction =
  | Action$AddDocument
  | Action$SetDocument
  | Action$SetDocumentContent
  | Action$SelectDocument
  | Action$SetThemeType;

export interface Action$AddDocument extends _Action<'ADD_DOCUMENT'> {
  documentLocal: DocumentLocal;
  documentContent: DocumentContent;
}

export function addDocument(
  documentLocal: DocumentLocal,
  documentContent: DocumentContent,
): Action$AddDocument {
  return {
    documentContent,
    documentLocal,
    type: 'ADD_DOCUMENT',
  };
}

export interface Action$SetDocument extends _Action<'SET_DOCUMENT'> {
  document: Document;
}

export function setDocument(document: Document): Action$SetDocument {
  return {
    document,
    type: 'SET_DOCUMENT',
  };
}

export interface Action$SetDocumentContent {
  documentRef: DocumentRef;
  documentContent: DocumentContent;
  type: 'SET_DOCUMENT_CONTENT';
}

export function setDocumentContent(
  documentRef: DocumentRef,
  documentContent: DocumentContent,
): Action$SetDocumentContent {
  return {
    documentRef,
    documentContent,
    type: 'SET_DOCUMENT_CONTENT',
  };
}

interface Action$SelectDocument extends _Action<'SELECT_DOCUMENT'> {
  documentRef: DocumentRef | undefined;
}

export function selectDocument(
  documentRef: DocumentRef | undefined,
): Action$SelectDocument {
  return {
    documentRef,
    type: 'SELECT_DOCUMENT',
  };
}

interface Action$SetThemeType extends _Action<'SET_THEME_TYPE'> {
  themeType: ThemeType;
  type: 'SET_THEME_TYPE';
}

export function setThemeType(themeType: ThemeType): Action$SetThemeType {
  return {
    themeType,
    type: 'SET_THEME_TYPE',
  };
}
