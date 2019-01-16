import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import OrganizationCard from './Common/OrganizationCard';
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
    return {
        resource: state.filteredResource
    }
}


export default connect(mapStateToProps)(CardGrid);