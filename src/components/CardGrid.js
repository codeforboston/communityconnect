import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import OrganizationCard from './OrganizationCard';
import styles from './CardGrid.css';

class CardGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resource: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ resource: Object.assign({}, nextProps.resource) });
    }

    cardClick = (id) => {
        var index = this.props.resource.findIndex( data => {
          return data.id === id;
        })
        this.props.cardClick(index)
    
      }

    render() {
        const { resource } = this.props;
        return (
            <Container className={styles.grid}>
                <Row>
                    {
                        resource.map((data, index) => (
                        <Col key={index} className="spacing" lg="4" sm="6" xs="12">
                            <OrganizationCard
                                key={data.id}
                                ref={data.id}
                                index={data.id}
                                cardClick={this.cardClick}
                                organization={data}
                                saveItem={() => this.props.saveItem(resource)}
                            />
                        </Col>
                        ))
                    }
                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        resource: state.resource
    }
}


export default connect(mapStateToProps)(CardGrid);