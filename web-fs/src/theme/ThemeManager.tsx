import './ThemeManager.css';

import React, { useRef } from 'react';

import { useRegisterThemeManager } from './useTheme';

interface Props {
  children?: React.ReactNode;
}

// NOTE: This value is defined in CSS.
const EnableTransitionsClassName = 'ThemeManager-root-enableThemeTransitions';

const ThemeManager: React.FC<Props> = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  function onWillChangeTheme(onReady: () => void) {
    const element = ref.current;
    if (!element) {
      onReady();
      return;
    }

    // TODO: Need to test this across browsers.
    element.classList.add(EnableTransitionsClassName);
    setTimeout(onReady, 0);
  }

  function onDidChangeTheme() {
    const element = ref.current;
    if (!element) {
      return;
    }

    element.classList.remove(EnableTransitionsClassName);
  }

  useRegisterThemeManager(onWillChangeTheme, onDidChangeTheme);

  return (
    <div className="ThemeManager-root" ref={ref}>
      {props.children}
    </div>
  );
};

export default ThemeManager;
