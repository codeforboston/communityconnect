import React, { Component } from 'react';

import { AdminPageWrapper } from './AdminPageLayout';
import CategoryList from './CategoryList';
import CardGrid from './CardGrid';
import { connect } from 'react-redux';
import { getDistance } from '../../utils/distance.js';

export class AdminPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSort: this.sortByAlphabet,
        }
    }

    getCloserResource = (a, b) => {
        if (getDistance(a, this.props.currentPosition)
            > getDistance(b, this.props.currentPosition)) {
            return 1;
        }

        return -1;
    }

    getCloserName = (a, b) => {
        if (a.name > b.name) return 1
        else if (a.name < b.name) return -1
        else return 0
    }

    sortByAlphabet = () => {
        return this.props.resource.slice().sort(this.getCloserName);
    }

    sortByDistance = () => {
        return this.props.resource.slice().sort(this.getCloserResource);
    }

    handleSort = (newSort) => {
        if (this.state.dataSort !== newSort)
            this.setState({
                // Set the dataSort variable to whichever sort function is chosen
                dataSort: newSort
            })
    }

    render() {
        console.log(this.state.dataSort);
        const sortOptions = [
            { key: 'A-Z', sort: this.sortByAlphabet, disabled: false }
            , { key: 'Distance', sort: this.sortByDistance, disabled: !this.props.currentPosition }
        ];

        return (
            <AdminPageWrapper>
                <CategoryList currentPos={this.props.currentPosition} changeSort={this.handleSort} sortOptions={sortOptions}/>
                <CardGrid currentPos={this.props.currentPosition} sort={this.state.dataSort} />
            </AdminPageWrapper>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        resource: state.resource
    }
}

export default connect(mapStateToProps)(AdminPage);

