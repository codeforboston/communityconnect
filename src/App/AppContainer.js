// import React/Redux dependencies
import React, { Component } from "react";
import { Route } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadResources } from "../action/resourceDataAction";
import getAllSites from "../api/directoryGoogleSheets";

// import components

import Header from "../components/Header/Header";
import MapPage from "../components/MapPage/MapPage";
import AdminPage from "../components/AdminPage/AdminPage";
import SplitScreenTogglePane from "../components/AdminPage/SplitScreenTogglePane";
import SavedResourcePanel from "../components/SavedResources/SavedResourcePanel";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import Loading from "../components/Common/Loading";
import FeedbackContainer from "../components/Common/FeedbackContainer";

const envSheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID;

// unused code
// const revereSheetId = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';

function sheetIdFromPath(directory, path) {
  if (directory.find(x => x.path === path)) {
    return directory.find(x => x.path === path).sheetId;
  }
  else return null
}

class AppContainer extends Component {
  state = {
    position: {},
    displayFeedbackLink: false,
    isValidPage: true,
  };

  componentDidMount() {
    const hideFeedbackTs = localStorage.getItem("hideFeedback");

    if (hideFeedbackTs === null || Date.now() > parseInt(hideFeedbackTs, 10)) {
      localStorage.removeItem("hideFeedback");
      this.setState({ displayFeedbackLink: true });
    }
    console.log(hideFeedbackTs, typeof hideFeedbackTs);
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
    const weekMillis = 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("hideFeedback", Date.now() + weekMillis);
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
                lng: parseFloat(position.coords.longitude),
              },
            },
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  };

  toggleSavedResourcesPane = () => {
    this.setState(prevState => ({
      isSavedResourcePaneOpen: !prevState.isSavedResourcePaneOpen,
    }));
  };

  render() {
    if (!this.state.isValidPage) {
      return <NotFoundPage />;
    }

    if (this.props.isFetchingResource) {
      return (
        <Loading toggleSavedResourcesPane={this.toggleSavedResourcesPane} />
      );
    }

    return (
      <div className="viewport">
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
    );
  }
}

AppContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isFetchingResource: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { isFetchingResource } = state;

  return { isFetchingResource };
}
export default connect(mapStateToProps)(AppContainer);
