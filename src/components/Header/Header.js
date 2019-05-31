import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import {
  Navbar,
  NavbarBrand,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import { Badge, SavedResourcesButton } from './HeaderLayout';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.confirmationModalToggle = this.confirmationModalToggle.bind(this);
    this.state = {
      collapsed: true,
      modal: false,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  modalOpen() {
    if (this.props.savedResource.length > 0)
      this.modalToggle();
    else
      window.location.reload();
  }

  modalToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  confirmationModalToggle = () => {
    window.location.href = "/admin";
    this.modalToggle();
  };

  hasItems = () => {
    return (this.props.savedResource.length >= 1);
  }

  btnBadge = () => {
    const savedResources = this.props.savedResource;
    return savedResources.length
      ? <Badge>{savedResources.length}</Badge>
      : null; 
  }

  render() {
    return (
      <>
        <Navbar color="light" light expand="md" style={{justifyContent: "space-between"}}>
          <NavbarBrand className="Logo" onClick={this.modalOpen}>
            <h3>Community Connect</h3>
          </NavbarBrand>
          <Route path='/:resource/admin' render={props =>
            <SavedResourcesButton
              hasItems={this.hasItems()}
              onClick={() => this.props.toggleSavedResourcesPane()}>
              Saved Resources {this.btnBadge()}
            </SavedResourcesButton>
          } />
        </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
          <ModalHeader>Alert</ModalHeader>
          <ModalBody>This action will clear all your saved resources. Do you want to proceed?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.modalToggle}>Cancel</Button>{' '}
            <Button color="secondary" onClick={this.confirmationModalToggle}>Continue</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    savedResource: state.savedResource
  }
}

export default connect(mapStateToProps)(Header);
