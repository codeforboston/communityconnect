import React from "react";
import PropTypes from "prop-types";
import Header from "../Header/Header";

// import image
import Logo from "../../images/cc-logo-home.png";

const Loading = ({ toggleSavedResourcesPane }) => (
  <div className="viewport">
    <div className="d-flex w-100 h-100 flex-column">
      <div className="viewport-header">
        <Header toggleSavedResourcesPane={toggleSavedResourcesPane} />
      </div>
      <img src={Logo} alt="" className="loading-logo" />
    </div>
  </div>
);

Loading.propTypes = {
  toggleSavedResourcesPane: PropTypes.func.isRequired
};

export default Loading;
