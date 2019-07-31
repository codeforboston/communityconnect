// import React/Redux dependencies
import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadResources } from '../action/resourceDataAction';
import { getAllSites } from '../api/directoryGoogleSheets';

// import components
import { Badge } from 'reactstrap';
import Loader from 'react-loader-spinner';
import Header from '../components/Header/Header';
import MapPage from '../components/MapPage/MapPage';
import AdminPage from '../components/AdminPage/AdminPage';
import { SplitScreenTogglePane } from '../components/AdminPage/SplitScreenTogglePane';
import SavedResourcePanel from '../components/SavedResources/SavedResourcePanel';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';

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
      position: {},
      displayFeedbackLink: true,
      isValidPage: true,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
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
                lng: parseFloat(position.coords.longitude),
              },
            },
          });
        },
        error => {
          console.log(error);
        },
      );
    }
  };

  toggleSavedResourcesPane = () => {
    this.setState({
      isSavedResourcePaneOpen: !this.state.isSavedResourcePaneOpen,
    });
  };

  render() {
    const { isFetchingResource } = this.props;

    if (!this.state.isValidPage) return <NotFoundPage />;

    return (
      <div className="container-fluid">
        <div className="viewport">
          <div className="viewport-header">
            <Header toggleSavedResourcesPane={this.toggleSavedResourcesPane} />
          </div>
          {isFetchingResource && (
            <div className="spinner">
              <Loader type="TailSpin" color="#00BFFF" height="50" width="50" />{' '}
            </div>
          )}
          {!isFetchingResource && (
            <div className="page">
              <Route
                exact
                path="/:resource/admin"
                render={() => (
                  <AdminPage currentPosition={this.state.position} />
                )}
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
              <SplitScreenTogglePane
                isOpen={this.state.isSavedResourcePaneOpen}
              >
                <SavedResourcePanel
                  resourcePath={this.props.match.params.resource}
                />
              </SplitScreenTogglePane>
            </div>
          )}
        </div>

        {this.state.displayFeedbackLink && (
          <div className="feedback-container">
            <span>Want to improve Community Connect?</span>
            <div className="d-flex justify-content-center">
              <Badge
                className="badge"
                href="https://forms.gle/bA33aBUnEUB7R9wC9"
                target="_new"
                color="primary"
              >
                <span>Submit feedback</span>
              </Badge>
              <Badge
                className="badge"
                onClick={this.hideFeedbackLink}
                color="light"
              >
                <span>Do it later</span>
              </Badge>
            </div>
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
