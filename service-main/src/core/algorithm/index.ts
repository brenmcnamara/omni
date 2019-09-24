import * as Database from '../../services/database';
import * as Email from '../../services/file-storage/Email.generated';
import * as FileStorage from '../../services/file-storage';
import * as Notifications from '../../services/notifications';

import { FileContents } from '../../services/file-storage/FileContents';

const ALGORITHM_SOURCE_EMAIL = 'TODO: Put this here';

export const subscriptions = [
  /**
   * Takes an email from the algorithm newsletter and converts it to a readable markdown file.
   * Saves it to my cloud file system and generates a notification about the article.
   */
  FileStorage.Hooks.DidCreateFile()
    .ofType(Email.Model)
    .createHook()
    .subscribe(async (email: Email.Model) => {
      if (!isAlgorithmEmail(email)) {
        return;
      }

      const contents = await FileStorage.genFetchFileContents(email);
      const name = processAlgorithmArticleName(contents);
      const processed = processAlgorithmArticleContents(contents);

      // TODO: Pointer back to original email.
      const createFileTransaction = new FileStorage.Transactions.CreateFile({
        contents: processed,
        name,
        tags: ['article / algorithm'],
      });

      // TODO: Fix the typing here.
      const { file } = await Database.commit(createFileTransaction);

      const createNotificationTransaction = new Notifications.Transactions.CreateNotification(
        {
          description: 'An Algorithm article was created',
          modelRef: file.createRef(),
        },
      );

      await Database.commit(createNotificationTransaction);
    }),
];

function isAlgorithmEmail(email: Email.Model): boolean {
  return email.sender === ALGORITHM_SOURCE_EMAIL;
}

function processAlgorithmArticleName(
  contents: FileContents<'text/html'>,
): string {
  return 'Hello World';
}

function processAlgorithmArticleContents(
  content: FileContents<'text/html'>,
): FileContents<'text/html'> {
  return content;
}
