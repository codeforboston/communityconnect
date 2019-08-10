import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const SplitScreenTogglePane = ({ isOpen, children }) => {
  const splitScreenTogglePaneClassName = cx("split-screen", {
    hidden: !isOpen,
  });

  return <div className={splitScreenTogglePaneClassName}>{children}</div>;
};

SplitScreenTogglePane.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.object.isRequired,
};

SplitScreenTogglePane.defaultProps = {
  isOpen: false,
};
export default SplitScreenTogglePane;
