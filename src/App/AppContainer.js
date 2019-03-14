import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router';
import {connect} from 'react-redux';

import Header from '../components/Header/Header';
import MapPage from '../components/MapPage/MapPage';
import AdminPage from '../components/AdminPage/AdminPage';
// eslint-disable-next-line max-len
import {SplitScreenTogglePane} from '../components/SlidingPane/SplitScreenSlidingPane';
// eslint-disable-next-line max-len
import SavedResourcePanel from '../components/SavedResources/SavedResourcePanel';
import styles from './App.module.css';
import Loader from 'react-loader-spinner';


class AppContainer extends Component {
  static propTypes = {
    isFetchingResource: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      position: {},
    };
    this.toggleSavedResourcesPane = this.toggleSavedResourcesPane.bind(this);
  }

    getLocation = () => {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              position: {
                coordinates: {
                  lat: parseFloat(position.coords.latitude),
                  lng: parseFloat(position.coords.longitude),
                },
              },
            });
          },
          (error) => {
          });
      }
    }

    componentDidMount() {
      this.getLocation();
    }

    toggleSavedResourcesPane = () => {
      this.setState({
        isSavedResourcePaneOpen: !this.state.isSavedResourcePaneOpen,
      });
    }

    render() {
      const {isFetchingResource} = this.props;
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
                <Route
                  exact path='/admin'
                  render={
                    (props) => <AdminPage
                      currentPosition={this.state.position}
                    />
                  }
                />
                <Route
                  exact path='/'
                  render={
                    (props) => <MapPage
                      currentPosition={this.state.position}
                    />
                  }
                />
                <SplitScreenTogglePane
                  isOpen={this.state.isSavedResourcePaneOpen}
                >
                  <SavedResourcePanel />
                </SplitScreenTogglePane>
              </div>
            }
          </div>
        </div>
      );
    }
}
function mapStateToProps(state, ownProps) {
  const {isFetchingResource} = state;
  return {
    isFetchingResource: isFetchingResource,
  };
}
export default connect(mapStateToProps)(AppContainer);
