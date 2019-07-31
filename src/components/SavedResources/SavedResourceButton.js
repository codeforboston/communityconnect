import React from 'react';
import { Button } from 'reactstrap';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

export const SavedResourceButton = props => {
  const { onClick } = props;
  const buttonIcon = faMinus;
  const buttonClassName = cx('saved-resource-card-button', {
    faMinus,
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
