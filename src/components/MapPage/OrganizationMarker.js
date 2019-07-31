import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

export class OrganizationMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.setState({ open: this.props.open });
    }
  }
  // scrollToElement  and handleClickOfInfoWindow is currently non-functional

  scrollToElement = e => {
    this.setState({ open: true });
  };

  handleClickOfInfoWindow = e => {
    var element = document.getElementById(e.currentTarget.id);
    element.scrollIntoView();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let { resource } = this.props;
    return (
      <Marker
        optimize={false}
        position={resource.coordinates}
        onClick={this.scrollToElement}
      >
        {this.state.open && (
          <InfoWindow onCloseClick={this.handleClose}>
            <div>
              {resource.groupedResource.map(resource => (
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

export default OrganizationMarker;
