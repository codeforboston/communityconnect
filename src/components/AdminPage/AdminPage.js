import React from 'react';

import { AdminPageWrapper } from './AdminPageLayout';
import CategoryList from './CategoryList';
import CardGrid from './CardGrid';

const AdminPage = ({currentPosition}) => (
    <AdminPageWrapper>
        <CategoryList currentPos={currentPosition} />
        <CardGrid currentPos={currentPosition} />
    </AdminPageWrapper>
)

export default AdminPage;
