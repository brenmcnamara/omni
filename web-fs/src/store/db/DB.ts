import * as t from 'io-ts';
import LocalCache from './LocalCache';
import uuid from 'uuid/v4';

import {
  DocumentContent,
  Local as DocumentLocal,
  Persisted as DocumentPersisted,
  tPersisted as tDocumentPersisted,
} from '../Document.model';
import { State as EditMode, tState as tEditMode } from '../editMode.reducer';

class DB {
  private indexCache = new LocalCache<string[]>(
    this.createIndexNamespace(),
    t.array(t.string),
  );

  constructor() {
    // TODO: Guard against case where local storage is not available.

    this.documentIndex = this.indexCache.get('Document') || [];
  }

  // ---------------------------------------------------------------------------
  // VERSIONING
  // ---------------------------------------------------------------------------

  public static version = 'v1';

  public static collectionVersion = {
    Document: 'v1',
    DocumentContent: 'v1',
  };

  // ---------------------------------------------------------------------------
  // CONFIGURATIONS
  // ---------------------------------------------------------------------------

  private editModeCache = new LocalCache<EditMode>(
    `${DB.version}.editMode`,
    tEditMode,
  );

  public genFetchEditMode(): Promise<EditMode> {
    return new Promise(resolve => {
      const editMode = this.editModeCache.get('onlyOne') || {
        type: 'NEW_DOCUMENT',
      };

      resolve(editMode);
    });
  }

  public genSetEditMode(editMode: EditMode): Promise<EditMode> {
    return new Promise(resolve => {
      this.editModeCache.set('onlyOne', editMode);
      resolve(editMode);
    });
  }

  // ---------------------------------------------------------------------------
  // DOCUMENT
  // ---------------------------------------------------------------------------

  private documentCache = new LocalCache<DocumentPersisted>(
    this.createCollectionNamespace('Document'),
    tDocumentPersisted,
  );

  private documentIndex: string[];

  public genFetchDocument(id: string): Promise<DocumentPersisted | undefined> {
    return Promise.resolve(this.documentCache.get(id));
  }

  public genFetchDocuments(): Promise<{
    [id: string]: DocumentPersisted;
  }> {
    return new Promise(resolve => {
      const ids = this.indexCache.get('Document') || [];
      const collection: { [id: string]: DocumentPersisted } = {};

      for (const id of ids) {
        const document = this.documentCache.get(id);
        if (document !== undefined) {
          collection[id] = document;
        }
      }

      resolve(collection);
    });
  }

  public genCreateDocument(local: DocumentLocal): Promise<DocumentPersisted> {
    return new Promise(resolve => {
      const id = uuid();
      const now = new Date();
      const persisted: DocumentPersisted = {
        createdAt: now,
        groups: local.groups,
        id,
        isDeleted: false,
        modelType: 'Document',
        name: local.name,
        type: 'MODEL',
        updatedAt: now,
      };

      this.documentContentCache.set(id, '');
      this.documentCache.set(id, persisted);

      this.documentIndex.push(id);
      this.indexCache.set('Document', this.documentIndex);

      resolve(persisted);
    });
  }

  public genSetDocument(
    persisted: DocumentPersisted,
  ): Promise<DocumentPersisted> {
    return new Promise(resolve => {
      // NOTE: We are assuming here that the client did not mutate the id.
      this.documentCache.set(persisted.id, persisted);
      resolve(persisted);
    });
  }

  public genDeleteDocument(id: string): Promise<void> {
    return new Promise(resolve => {
      const index = this.documentIndex.indexOf(id);
      if (index >= 0) {
        this.documentIndex.splice(index, 1);
      }

      this.indexCache.set('Document', this.documentIndex);
      this.documentCache.remove(id);
      this.documentContentCache.remove(id);
      resolve();
    });
  }

  // ---------------------------------------------------------------------------
  // DOCUMENT CONTENT
  // ---------------------------------------------------------------------------

  private documentContentCache = new LocalCache<string>(
    this.createCollectionNamespace('DocumentContent'),
    t.string,
  );

  public genFetchDocumentContent(id: string): Promise<string | undefined> {
    return Promise.resolve(this.documentContentCache.get(id));
  }

  public genFetchDocumentContents(): Promise<{
    [id: string]: DocumentContent;
  }> {
    return new Promise(resolve => {
      const ids = this.indexCache.get('Document') || [];
      const collection: { [id: string]: DocumentContent } = {};

      for (const id of ids) {
        const documentContent = this.documentContentCache.get(id);
        if (documentContent !== undefined) {
          collection[id] = documentContent;
        }
      }

      resolve(collection);
    });
  }

  public genSetDocumentContent(
    id: string,
    content: DocumentContent,
  ): Promise<string> {
    return new Promise(resolve => {
      this.documentContentCache.set(id, content);
      resolve(content);
    });
  }

  // ---------------------------------------------------------------------------
  // UTILS
  // ---------------------------------------------------------------------------

  private createIndexNamespace(): string {
    return `${DB.version}.index`;
  }

  private createCollectionNamespace(
    collection: keyof typeof DB.collectionVersion,
  ): string {
    const collectionVersion = DB.collectionVersion[collection];
    if (!collectionVersion) {
      throw Error(`Unrecognized collection: ${collection}`);
    }

    return `${DB.version}.${collection}.${collectionVersion}`;
  }
}

export default new DB();
