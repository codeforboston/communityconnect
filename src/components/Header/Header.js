import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as resourceAction from '../../action/resourceDataAction';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.removeModal = this.removeModal.bind(this);
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

  modalToggle() {    
    if(this.props.savedResource.length > 0){
      this.setState({
        modal: true
      });
    }
    else
      window.location.reload();    
  }

  removeModal() {
    this.setState({
      modal: false
    });
  }

  confirmationModalToggle = () => {
    window.location.href = "/";
    this.setState({
      modal: false
    });
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
        <NavbarBrand className="Logo" onClick={this.modalToggle}>
          <h3>Community Connect</h3>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar}  />
        <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              <Button
                color="secondary"
                onClick={() => this.props.toggleSavedResourcesPane()}>
                Saved Resources
              </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.confirmationModalToggle} onClosed={this.toggle}>
          <ModalHeader>Alert</ModalHeader>
          <ModalBody>This action will clear all your saved resources. Do you want to proceed?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.removeModal}>Cancel</Button>{' '}
            <Button color="secondary" onClick={this.confirmationModalToggle}>Continue</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    savedResource: state.savedResource
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
