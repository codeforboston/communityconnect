import React from 'react';
import cx from 'classnames';

export const SplitScreenTogglePane = ({ isOpen, children }) => {
  const splitScreenTogglePaneClassName = cx('split-screen', {
    hidden: !isOpen,
  });

  return <div className={splitScreenTogglePaneClassName}>{children}</div>;
};
