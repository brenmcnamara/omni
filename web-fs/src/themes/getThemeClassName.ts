import { Theme } from './Theme';

export default function getThemeClassName(theme: Theme): string {
  return `Theme-${theme}`;
}
