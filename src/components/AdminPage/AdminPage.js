import React from 'react';
import PropTypes from 'prop-types';

import CategoryList from './CategoryList';
import CardGrid from './CardGrid';

const AdminPage = ({currentPosition}) => {
  return (
    <div className="container-fluid pb-sm-5">
      <div className="row">
        <div className="col-sm-4">
          <CategoryList/>
        </div>
        <div className="col-sm-8">
          <CardGrid
            currentPos={currentPosition}
          />
        </div>
      </div>
    </div>
  );
};

AdminPage.propTypes = {
  currentPosition: PropTypes.shape({
    coordinates: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }),
};

export default AdminPage;
