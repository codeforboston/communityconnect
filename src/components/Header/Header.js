import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import cx from "classnames";

import {
  Navbar,
  NavbarBrand,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import * as resourceAction from "../../action/resourceDataAction";

class Header extends Component {
  state = {
    collapsed: true,
    modal: false,
  };

  toggleNavbar = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  };

  modalOpen = () => {
    if (this.props.savedResources.length > 0) {
      this.modalToggle();
    } else {
      window.location.reload();
    }
  };

  modalToggle = () => {
    this.setState(prevState => ({ modal: !prevState.modal }));
  };

  confirmationModalToggle = () => {
    this.props.actions.clearSavedResources();
    this.modalToggle();
  };

  render() {
    const { savedResources, toggleSavedResourcesPane } = this.props;

    const savedResourceButtonClassNames = cx("saved-resource-button", {
      "has-selections": savedResources.length,
    });

    return (
      <>
        <Navbar className="main-nav-bar">
          <NavbarBrand className="Logo" onClick={this.modalOpen}>
            <span>Community Connect</span>
          </NavbarBrand>
          <Route
            path="/:resource/admin"
            render={() => (
              <button
                type="button"
                className={savedResourceButtonClassNames}
                onClick={toggleSavedResourcesPane}
              >
                Saved Resources {savedResources.length}
              </button>
            )}
          />
        </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
          <ModalHeader>Alert</ModalHeader>
          <ModalBody>
            This action will clear all your saved resources. Do you want to
            proceed?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.modalToggle}>
              Cancel
            </Button>{" "}
            <Button
              tag={Link}
              color="secondary"
              onClick={this.confirmationModalToggle}
              to={`/${this.props.match.params.resource}/admin`}
            >
              Continue
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

Header.propTypes = {
  savedResources: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  toggleSavedResourcesPane: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    savedResources: state.savedResources,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch),
  };
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Header);
