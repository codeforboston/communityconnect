import React, { Component } from "react";

import ResultList from "./ResultList";
import OrganizationMap from "./OrganizationMap";
import { SplitScreenSlidingPane } from "./SplitScreenSlidingPane";
import cx from "classnames";

class MapPage extends Component {
  render() {
    const mapClassName = cx("map-container");
    return (
      <div className={mapClassName}>
        <SplitScreenSlidingPane>
          <ResultList
            ref={instance => {
              this.resultListItem = instance;
            }}
            cardClick={this.cardClick}
            currentPos={this.props.currentPosition}
            fullWidth={true}
          />
        </SplitScreenSlidingPane>
        <div className="static-pane">
          <OrganizationMap />
        </div>
      </div>
    );
  }
}

export default MapPage;
