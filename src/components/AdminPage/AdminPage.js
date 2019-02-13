import React from 'react';

import CategoryList from './CategoryList';
import CardGrid from './CardGrid';
import styles from './AdminPage.module.css';


const AdminPage = ({currentPosition}) => {

        return (
            <div className={styles.wrapper}>
                <div>
                <CategoryList />
                </div>
                <CardGrid
                    currentPos={currentPosition}
                />
            </div>
        );
}

export default AdminPage;
