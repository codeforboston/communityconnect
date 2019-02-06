import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import OrganizationCard from '../Common/OrganizationCard';
import styles from './CardGrid.css';


const CardGrid = ({ routerLocation, saveItem, resource }) => {

    return (
        <Container className={styles.grid}>
            <Row>
                {
                    resource.map((resource, index) => (
                        <Col key={resource.id} className="spacing" lg="4" sm="6" xs="12">
                            <OrganizationCard
                                key={resource.id}
                                index={resource.id}
                                organization={resource}
                                saveItem={() => saveItem(resource)}
                                saveable={true}
                            />
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
};

function mapStateToProps(state, ownProps) {
    let res = [];
    //Not the most efficient logic, but it works. Will have to optimize this later 
    for (var i = 0, len1 = state.searchedResource.length; i < len1; i++) {
        for (var j = 0, len2 = state.filteredResource.length; j < len2; j++) {
            if (state.searchedResource[i].id === state.filteredResource[j].id) {
                res.push(state.searchedResource[i])
            }
        }
    }

    return {
        resource: res
    }
}


export default connect(mapStateToProps)(CardGrid);