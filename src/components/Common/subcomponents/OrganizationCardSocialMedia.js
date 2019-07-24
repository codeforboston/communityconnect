import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const OrganizationCardSocialMedia = ({ url, icon, title }) =>
  url ? (
    <div
      className="organization-card-social-media"
      href={url}
      data-type="social"
    >
      <FontAwesomeIcon icon={['fab', icon]} size="2x" title={title} />
    </div>
  ) : null;
