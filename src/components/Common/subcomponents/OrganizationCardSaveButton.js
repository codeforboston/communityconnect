import React from 'react';
import { Button } from 'reactstrap';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

export const OrganizationCardSaveButton = props => {
  // @TODO: add on click animation back in
  const { saveExist, onClick } = props;
  const buttonIcon = saveExist ? faMinus : faPlus;
  const buttonClassName = cx('organization-card-button', {
    plus: !saveExist,
    minus: saveExist,
  });

  return (
    <span>
      <Button
        title="Add item to Saved Resources"
        aria-label="Add item to Saved Resources"
        color={saveExist ? 'light' : 'info'}
        className={buttonClassName}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={buttonIcon} />
      </Button>
    </span>
  );
};
