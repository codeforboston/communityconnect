import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import styles from './Header.module.css';

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
  ModalFooter,
  Badge
} from 'reactstrap';

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

  btnColor = () => {
    if (this.props.savedResource.length >= 1) {
      return styles["header__saved-resources--blue"];
    }
  }

  btnBadge = () => {
    const savedResources = this.props.savedResource;
    if(savedResources.length >= 1) {
      return (
        <Badge variant="primary" className={styles["header__saved-resources--count"]}>{savedResources.length}</Badge>
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand className="Logo" onClick={this.modalOpen}>
            <h3>Community Connect</h3>
          </NavbarBrand>
          <Route path='/admin' render={props =>
            <div id="navbar">
              <NavbarToggler onClick={this.toggleNavbar} />
              <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem className={styles["header__saved-resources"]}>
                    <Button
                      className={this.btnColor()}
                      onClick={() => this.props.toggleSavedResourcesPane()}>
                      Saved Resources {this.btnBadge()}
                    </Button>
                  </NavItem>
                </Nav>
              </Collapse>
            </div>
          } />
        </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.modalToggle} onClosed={this.toggle}>
          <ModalHeader>Alert</ModalHeader>
          <ModalBody>This action will clear all your saved resources. Do you want to proceed?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.modalToggle}>Cancel</Button>{' '}
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

export default connect(mapStateToProps)(Header);
