import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PrintPanel from "./PrintPanel";

export const date = new Date().toLocaleDateString("en-US");

const PrintPage = ({ savedResources }) => (
  <div>
    <div className="print-header">
      <h2>Resource List</h2>
      <h5>Date printed: {date}</h5>
    </div>
    <div>
      {savedResources.map((resource, index) => (
        <PrintPanel key={index} resource={resource} index={index} />
      ))}
    </div>
  </div>
);

PrintPage.propTypes = {
  savedResources: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  console.log("State: ", state);

  return {
    savedResources:
      state.savedResources.length > 0 ? state.savedResources : state.resources,
  };
}
export default connect(mapStateToProps)(PrintPage);
