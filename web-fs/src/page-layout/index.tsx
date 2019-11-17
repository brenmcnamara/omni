import classnames from 'classnames';
import Icon from '../Icon';
import LeftPane from './LeftPane';
import pageLayoutStyles from './PageLayout.module.css';
import React, { useState } from 'react';
import RightPane from './RightPane';
import Toolbar from './Toolbar';
import ToolbarButton from './ToolbarButton';
import useTheme from '../theme/useTheme';

import { bars } from '../icons';

interface Props {
  Left: JSX.Element;
  Right: JSX.Element;
  ToolbarButtons: JSX.Element;
}

const App: React.FC<Props> = (props: Props) => {
  const themeInfo = useTheme()[0];
  const [isLeftPaneHidden, setIsLeftPaneHidden] = useState(false);

  return (
    <div
      className={classnames(
        pageLayoutStyles.root,
        themeInfo.theme.backgroundColorPrimary,
      )}
    >
      <Toolbar>
        <ToolbarButton onClick={() => setIsLeftPaneHidden(!isLeftPaneHidden)}>
          <Icon icon={bars} iconColor="primary" size={16} />
        </ToolbarButton>
        {props.ToolbarButtons}
      </Toolbar>
      <div className={pageLayoutStyles.paneContainer}>
        <LeftPane
          isHidden={isLeftPaneHidden}
          onChangeHidden={isHidden => setIsLeftPaneHidden(isHidden)}
        >
          {props.Left}
        </LeftPane>
        <RightPane>{props.Right}</RightPane>
      </div>
    </div>
  );
};

export default App;
