import classnames from 'classnames';

import { ClassValue } from 'classnames/types';
import { FontMode } from './font';

export default function getFontModeClassNames(fontMode: FontMode): ClassValue {
  return classnames('FontMode-animatedTransition', `FontMode-${fontMode}`);
}
