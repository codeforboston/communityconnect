import React, { Component } from "react";
import PropTypes from "prop-types";
import { Marker, InfoWindow } from "react-google-maps";

class OrganizationMarker extends Component {
  state = {
    open: this.props.open,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.updateOpen();
    }
  }

  // scrollToElement  and handleClickOfInfoWindow is currently non-functional
  updateOpen = () => {
    this.setState({ open: this.props.open });
  };

  scrollToElement = () => {
    this.setState({ open: true });
  };

  handleClickOfInfoWindow = e => {
    const element = document.getElementById(e.currentTarget.id);
    element.scrollIntoView();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Marker
        optimize={false}
        position={this.props.resource.coordinates}
        onClick={this.scrollToElement}
      >
        {this.state.open && (
          <InfoWindow onCloseClick={this.handleClose}>
            <div>
              {this.props.resource.groupedResources.map(resource => (
                <div
                  key={resource.id}
                  id={resource.id}
                  onClick={this.handleClickOfInfoWindow}
                >
                  <h3>{resource.name}</h3>
                  <div>{resource.combinedaddress}</div>
                  <div>{resource.tags}</div>
                  <div>
                    <a href={`tel:${resource.phone}`}>{resource.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}

OrganizationMarker.propTypes = {
  open: PropTypes.bool.isRequired,
  resource: PropTypes.object.isRequired,
};

export default OrganizationMarker;
