import React, { Component } from 'react';
import {Route, Redirect} from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import MapPage from '../components/MapPage/MapPage';
import AdminPage from '../components/AdminPage/AdminPage';
import { SplitScreenTogglePane } from '../components/AdminPage/SplitScreenTogglePane';
import SavedResourcePanel from '../components/SavedResources/SavedResourcePanel';
import { loadResources } from '../action/resourceDataAction';
import {getAllSites} from '../api/directoryGoogleSheets';
import { Badge } from 'reactstrap';
import styles from './App.module.css';
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'

const envSheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID
const revereSheetId = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';

function sheetIdFromPath(directory, path){
    for (var i=0; i < directory.length; i++) {
        if (directory[i].path === path) {
            return directory[i].sheetId;
        }
    }
  }

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {},
            displayFeedbackLink: true
        }
        this.toggleSavedResourcesPane = this.toggleSavedResourcesPane.bind(this);
        this.feedbackHeight = 0;
    }


    hideFeedbackLink(){
        this.setState({
            displayFeedbackLink: false
        })
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
        var resourcePath = this.props.match.params.resource;
        var resourceSheetId = null;

        getAllSites.then(sites => {
            resourceSheetId = sheetIdFromPath(sites, resourcePath) || envSheetId;
        
            if(resourceSheetId == null){
                alert("Error: Unable to find resource '" + resourcePath + "'");
            }else{
                var resourcesFromSheet = loadResources(resourceSheetId);
                this.props.dispatch(resourcesFromSheet);
            }
        });
        
        this.getLocation();
    }

    toggleSavedResourcesPane = () => {
        this.setState({
            isSavedResourcePaneOpen: !this.state.isSavedResourcePaneOpen
        });
    }

    render() {
        let { isFetchingResource } = this.props;

        if(!this.state.displayFeedbackLink) this.feedbackHeight = 0;
        return (
            <div className="container-fluid">
                { this.state.displayFeedbackLink &&
                    <div className={styles.feedbackContainer} ref={(input) => { if(input) this.feedbackHeight = input.clientHeight }}>
                        Want to improve Community Connect? 
                        <br/>
                        <Badge className={styles.badge} href="https://forms.gle/bA33aBUnEUB7R9wC9" target="_new" color="primary">Submit feedback</Badge>
                        <Badge className={styles.badge} onClick={this.hideFeedbackLink.bind(this)} color="light">Do it later</Badge>


                    </div>
                }
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
                    {(!isFetchingResource) &&
                        <div>
                            <Route exact path='/:resource/admin' render={(props) => <AdminPage currentPosition={this.state.position} bottomMargin={this.feedbackHeight} />} />
                            <Route exact path='/:resource/' render={(props) => <MapPage currentPosition={this.state.position} bottomMargin={this.feedbackHeight} displayFeedbackLink={this.state.displayFeedbackLink} />} />
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
