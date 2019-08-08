import React from 'react';
import ReadMoreAndLess from 'react-read-more-less';

export const OrganizationCardOverview = ({ overview }) => (overview ? (
  <div className="organization-card">
    <ReadMoreAndLess
      ref={this.ReadMore}
      className="read-more-content"
      charLimit={250}
      readMoreText="Read more"
      readLessText="Read less"
    >
      {overview}
    </ReadMoreAndLess>
  </div>
) : null);
