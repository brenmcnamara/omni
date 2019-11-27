import * as t from 'io-ts';
import LocalCache from './LocalCache';
import uuid from 'uuid/v4';

import {
  Local as DocumentLocal,
  Persisted as DocumentPersisted,
  tPersisted as tDocumentPersisted,
} from '../Document.model';

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
  };

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
      resolve();
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
