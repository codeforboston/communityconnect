import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import MapPage from '../components/MapPage/MapPage';
import AdminPage from '../components/AdminPage/AdminPage';
import { SplitScreenTogglePane } from '../components/AdminPage/SplitScreenTogglePane';
import SavedResourcePanel from '../components/SavedResources/SavedResourcePanel';
import { loadResources } from '../action/resourceDataAction';
import styles from './App.module.css';
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'


class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {}
        }
        this.toggleSavedResourcesPane = this.toggleSavedResourcesPane.bind(this);
    }

    static propTypes = {
        dispatch: PropTypes.func,
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
        this.props.dispatch(loadResources(this.props.match.params.resource));
        this.getLocation();
    }

    toggleSavedResourcesPane = () => {
        this.setState({
            isSavedResourcePaneOpen: !this.state.isSavedResourcePaneOpen
        });
    }

    render() {
        let { isFetchingResource } = this.props;
        return (
            <div className="container-fluid">
                <div className={styles.viewport}>
                    <div className={styles.header}>
                        <Header
                            toggleSavedResourcesPane={this.toggleSavedResourcesPane}
                        />
                    </div>
                    {isFetchingResource && <div className={styles.spinner}><Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height="50"
                        width="50"
                    />  </div>}
                    {!isFetchingResource &&
                        <div>
                            <Route exact path='/:resource/admin' render={(props) => <AdminPage currentPosition={this.state.position} />} />
                            <Route exact path='/:resource/' render={(props) => <MapPage currentPosition={this.state.position} />} />
                            <SplitScreenTogglePane isOpen={this.state.isSavedResourcePaneOpen}>
                                <SavedResourcePanel resourcePath={this.props.match.params.resource} />
                            </SplitScreenTogglePane>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    let { isFetchingResource } = state;
    return {
        isFetchingResource: isFetchingResource
    }
}
export default connect(mapStateToProps)(AppContainer);
