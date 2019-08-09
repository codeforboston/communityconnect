import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";

const OrganizationCardSaveButton = ({ saveExist, onClick }) => {
  const buttonIcon = saveExist ? faMinus : faPlus;

  const buttonClassName = cx("organization-card-button", {
    plus: !saveExist,
    minus: saveExist
  });

  return (
    <span>
      <Button
        title="Add item to Saved Resources"
        aria-label="Add item to Saved Resources"
        color={saveExist ? "light" : "info"}
        className={buttonClassName}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={buttonIcon} />
      </Button>
    </span>
  );
};

OrganizationCardSaveButton.propTypes = {
  saveExist: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
export default OrganizationCardSaveButton;
