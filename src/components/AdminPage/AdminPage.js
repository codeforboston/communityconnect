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
                <div>
                <CardGrid
                    currentPos={currentPosition}
                />
                </div>
            </div>
        );
}

export default AdminPage;
