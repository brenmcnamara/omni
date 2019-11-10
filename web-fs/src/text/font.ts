export type FontStyle =
  | 'primary'
  | 'primaryBold'
  | 'heavy'
  | 'doc-h1'
  | 'doc-h2'
  | 'doc-h3'
  | 'doc-p';

export function getFontStyleClassName(fontStyle: FontStyle): string {
  return `FontStyle-${fontStyle}`;
}

export type FontColor = 'primary' | 'secondary' | 'tertiary';

export function getFontColorClassName(fontColor: FontColor): string {
  return `FontColor-${fontColor}`;
}

export type FontMode = 'darkBackground' | 'lightBackground';

export function getFontModeClassName(fontMode: FontMode): string {
  return `FontMode-${fontMode}`;
}
