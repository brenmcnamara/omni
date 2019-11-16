import classnames from 'classnames';
import LeftPane from './LeftPane';
import pageLayoutStyles from './PageLayout.module.css';
import React from 'react';
import RightPane from './RightPane';
import useTheme from '../theme/useTheme';

interface Props {
  Left: JSX.Element;
  Right: JSX.Element;
  Toolbar: JSX.Element;
}

const App: React.FC<Props> = (props: Props) => {
  const themeInfo = useTheme()[0];

  return (
    <div
      className={classnames(
        pageLayoutStyles.root,
        themeInfo.theme.backgroundColorPrimary,
      )}
    >
      <LeftPane>{props.Left}</LeftPane>
      <RightPane>{props.Right}</RightPane>
      {props.Toolbar}
    </div>
  );
};

export default App;
