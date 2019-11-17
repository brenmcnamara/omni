import classnames from 'classnames';
import Icon from '../Icon';
import pageLayoutStyles from './PageLayout.module.css';
import React from 'react';
import ToolbarButton from './ToolbarButton';

import { bars } from '../icons';
import { useTheme } from '../theme';

interface Props {
  children?: React.ReactNode;
  isHidden: boolean;
  onChangeHidden: (isHidden: boolean) => void;
}

const LeftPane: React.FC<Props> = (props: Props) => {
  const { theme } = useTheme()[0];

  console.log(props.isHidden);

  return (
    <div
      className={classnames(
        theme.borderColor,
        pageLayoutStyles.leftPane,
        props.isHidden && 'display-none',
        'border-right-lg',
      )}
    >
      <div
        className={classnames(
          pageLayoutStyles.leftPaneBackground,
          theme.backgroundColorSecondary,
        )}
      />
      <div className={pageLayoutStyles.leftPaneToolbar}>
        <ToolbarButton
          forceVerticalStackStyling={true}
          onClick={() => props.onChangeHidden(true)}
        >
          <Icon icon={bars} iconColor="primary" size={16} />
        </ToolbarButton>
      </div>
      <div className={pageLayoutStyles.leftPaneContent}>{props.children}</div>
    </div>
  );
};

export default LeftPane;
