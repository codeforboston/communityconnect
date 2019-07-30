import React from 'react';

export const OrganizationCardSaveButton = props => {
  // @TODO: add on click animation back in
  const { saveExist, saveItem } = props;
  const buttonSign = saveExist ? String.fromCharCode(0x2713) : '+';

  return (
    <span onClick={saveItem}>
      <button
        title="Add item to Saved Resources"
        aria-label="Add item to Saved Resources"
      >
        <span className="save-item">{buttonSign}</span>
      </button>
    </span>
  );
};
