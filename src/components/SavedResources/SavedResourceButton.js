import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";

const SavedResourceButton = ({ onClick }) => {
  const buttonIcon = faMinus;

  const buttonClassName = cx("saved-resource-card-button", {
    faMinus
  });

  return (
    <span>
      <Button
        title="Remove item from Saved Resources"
        aria-label="Remove item from Saved Resources"
        color="info"
        className={buttonClassName}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={buttonIcon} />
      </Button>
    </span>
  );
};

SavedResourceButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default SavedResourceButton;
