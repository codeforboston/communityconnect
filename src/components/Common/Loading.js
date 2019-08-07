import React from 'react';
import Header from '../Header/Header';

// import image
import Logo from '../../images/cc-logo-home.png';

export const Loading = () => {
  return (
    <div className="viewport">
      <div className="d-flex w-100 h-100 flex-column">
        <div className="viewport-header">
          <Header toggleSavedResourcesPane={this.toggleSavedResourcesPane} />
        </div>
        <img src={Logo} alt="" className="loading-logo" />
      </div>
    </div>
  );
};
