import React from 'react';
import CategoryList from './CategoryList';
import CardGrid from './CardGrid';

const AdminPage = ({ currentPosition }) => (
  <div className="admin-pane">
    <CategoryList />
    <CardGrid currentPos={currentPosition} />
  </div>
);

export default AdminPage;
