import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import ResultList from "./ResultList";
import OrganizationMap from "./OrganizationMap";
import SplitScreenSlidingPane from "./SplitScreenSlidingPane";

class MapPage extends Component {
  render() {
    const mapClassName = cx("map-container");
    return (
      <div className={mapClassName}>
        <SplitScreenSlidingPane>
          <ResultList
            cardClick={this.cardClick}
            currentPos={this.props.currentPosition}
            fullWidth
          />
        </SplitScreenSlidingPane>
        <div className="static-pane">
          <OrganizationMap />
        </div>
      </div>
    );
  }
}

MapPage.propTypes = {
  currentPosition: PropTypes.object.isRequired,
};

export default MapPage;
