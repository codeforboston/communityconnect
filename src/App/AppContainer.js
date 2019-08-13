// import React/Redux dependencies
import React, { Component } from "react";
import { Route } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadResources } from "../action/resourceDataAction";
import { getAllSites } from "../api/directoryGoogleSheets";

// import components

import Header from "../components/Header/Header";
import MapPage from "../components/MapPage/MapPage";
import AdminPage from "../components/AdminPage/AdminPage";
import { SplitScreenTogglePane } from "../components/AdminPage/SplitScreenTogglePane";
import SavedResourcePanel from "../components/SavedResources/SavedResourcePanel";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import { Loading } from "../components/Common/Loading";
import { FeedbackContainer } from "../components/Common/FeedbackContainer";
import LandingPage from '../components/LandingPage/LandingPage';
import Button from '../components/Button/Button'

const envSheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID;

// unused code
// const revereSheetId = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';

function sheetIdFromPath(directory, path) {
  for (let i = 0; i < directory.length; i++) {
    if (directory[i].path === path) {
      return directory[i].sheetId;
    }
  }
}

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landingPage: true,
      position: {},
      displayFeedbackLink: true,
      isValidPage: true
    };
  }

  static propTypes = {
    dispatch: PropTypes.func
  };

  componentDidMount() {
    const resourcePath = this.props.match.params.resource;
    let resourceSheetId = null;

    getAllSites.then(sites => {
      resourceSheetId = sheetIdFromPath(sites, resourcePath) || envSheetId;

      if (resourceSheetId == null) {
        this.setState({ isValidPage: false });
      } else {
        const resourcesFromSheet = loadResources(resourceSheetId);

        this.props.dispatch(resourcesFromSheet);
      }
    });

    this.getLocation();
  }

  hideFeedbackLink = () => {
    this.setState({ displayFeedbackLink: false });
  };

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
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  };

  toggleSavedResourcesPane = () => {
    this.setState({
      isSavedResourcePaneOpen: !this.state.isSavedResourcePaneOpen
    });
  };

  goToResources = () => {
    this.setState({
      landingPage: false
    })
  }




  render() {
    const { isFetchingResource } = this.props;
    const { landingPage } = this.state;

    if (!this.state.isValidPage) {
      return <NotFoundPage />;
    }

    if (isFetchingResource) {
      return <Loading />;
    }
    
    return (
      <div className="viewport" >
        {landingPage ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <LandingPage />
        {/* <button >Go To resources </button> */}
        <Button goToResources={this.goToResources} />
          </div>
        
      ) : (
        <div>
          <div className="viewport-header">
          <Header toggleSavedResourcesPane={this.toggleSavedResourcesPane} />
        </div>

        <div className="page">

          <Route
            exact
            path="/:resource/admin"
            render={() => <AdminPage currentPosition={this.state.position} />}
          />
          <Route
            exact
            path="/:resource/"
            render={() => (
              <MapPage
                currentPosition={this.state.position}
                displayFeedbackLink={this.state.displayFeedbackLink}
              />
            )}
          />
          <SplitScreenTogglePane isOpen={this.state.isSavedResourcePaneOpen}>
            <SavedResourcePanel
              resourcePath={this.props.match.params.resource}
            />
          </SplitScreenTogglePane>
        </div>

        {this.state.displayFeedbackLink && (
          <FeedbackContainer hideFeedbackLink={this.hideFeedbackLink} />
        )}
        </div>
      )}
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isFetchingResource } = state;
  return { isFetchingResource };
}
export default connect(mapStateToProps)(AppContainer);
