import React from 'react';

import { AdminPageWrapper } from './AdminPageLayout';
import CategoryList from './CategoryList';
import CardGrid from './CardGrid';

/**
 * @param {*} {currentPosition}
 */
const AdminPage = ({currentPosition}) => (
    <AdminPageWrapper>
        <CategoryList/>
        <CardGrid
            currentPos={currentPosition}
        />
    </AdminPageWrapper>
)

export default AdminPage;
