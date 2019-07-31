import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";

export class OrganizationMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.setState({ open: this.props.open });
    }
  }
  //scrollToElement  and handleClickOfInfoWindow is currently non-functional

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
    let iconMarker = new window.google.maps.MarkerImage(
      "https://cdn0.iconfinder.com/data/icons/business-human-resources-2/128/60-512.png",
      null /* size is determined at runtime */,
      null /* origin is 0,0 */,
      null /* anchor is bottom center of the scaled image */,
      new window.google.maps.Size(32, 32)
    );
    const InfoWindowStyle = {
      backgroundColor: "green"
    };
    return (
      <Marker
        icon={iconMarker}
        optimize={false}
        position={resource.coordinates}
        onClick={this.scrollToElement}
      >
        {this.state.open && (
          <InfoWindow onCloseClick={this.handleClose} style={InfoWindowStyle}>
            <div>
              {resource.groupedResource.map(resource => (
                <div
                  key={resource.id}
                  id={resource.id}
                  onClick={this.handleClickOfInfoWindow}
                  style={{ padding: "25px" }}
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
