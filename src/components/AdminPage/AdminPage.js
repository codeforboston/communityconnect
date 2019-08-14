import React from "react";
import PropTypes from "prop-types";
import CategoryList from "./CategoryList";
import CardGrid from "./CardGrid";

const AdminPage = ({ currentPosition }) => (
  <div className="admin-pane">

    <div className="category-pane">
      <CategoryList />
    </div>
    
    <CardGrid currentPos={currentPosition} />
    
  </div>
);

AdminPage.propTypes = {
  currentPosition: PropTypes.object.isRequired,
};

export default AdminPage;
