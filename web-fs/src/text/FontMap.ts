import fontStyles from './Font.module.css';

const FontMap = {
  docH1: fontStyles.docH1,
  docH3: fontStyles.docH3,
  docP: fontStyles.docP,
  heavy: fontStyles.heavy,
  primary: fontStyles.primary,
  primaryBold: fontStyles.primaryBold,
};

export type Font = keyof typeof FontMap;

export default FontMap;
