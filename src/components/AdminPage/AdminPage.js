import React from 'react';

import AdminPageLayout from './AdminPageLayout';
import CategoryList from './CategoryList';
import CardGrid from './CardGrid';

const AdminPage = ({currentPosition}) => (
    <AdminPageLayout>
        <CategoryList/>
        <CardGrid
            currentPos={currentPosition}
        />
    </AdminPageLayout>
)

export default AdminPage;
