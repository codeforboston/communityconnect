import React, { Component } from 'react';

import CategoryList from './CategoryList';
import CardGrid from './CardGrid';
import styles from './Homepage.module.css';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardClickedIndex: null,
            isSavedResourcePaneOpen: false,
        }
        this.toggleSavedResourcesPane = this.toggleSavedResourcesPane.bind(this);
        this.orderResources = this.orderResources.bind(this);
        this.uploadResources = this.uploadResources.bind(this);
    }

    getLocation = () => {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState({
                        position: {
                            coordinates: {
                                lat: parseFloat(position.coords.latitude),
                                lng: parseFloat(position.coords.longitude)
                            }
                        }
                    })
                },
                error => {
                });
        } else {
        }
    }
    componentDidMount() {
        this.getLocation();
    }

    scrollToElement = index => {
        this.resultListItem.scrollToElement(index);
    }

    toggleSavedResourcesPane = () => {
        this.setState({
            isSavedResourcePaneOpen: !this.state.isSavedResourcePaneOpen
        });
    }

    orderResources = (sourceIndex, destinationIndex) => {
        let savedResources = this.state.savedResources.slice();

        let movedResource = savedResources[sourceIndex];
        savedResources.splice(sourceIndex, 1);
        savedResources.splice(destinationIndex, 0, movedResource);

        this.setState({
            savedResources: savedResources,
        })
    }

    uploadResources = (resources) => {
        this.setState({
            savedResources: resources.slice(),
        })
    }


    render() {
        return (
            <div className={styles.viewport}>
                <CategoryList />
                <CardGrid
                    routerLocation={this.props.location}
                    currentPos={this.state.position}
                />
            </div>
        );
    }
}

export default Homepage;
