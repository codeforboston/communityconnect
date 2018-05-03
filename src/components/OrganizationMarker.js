import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

export class OrganizationMarker extends Component {
  state = {
    open: false,
  }

  constructor(props) {
    super(props);

    if (props.open) {
      this.state.open = props.open;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({
        open: nextProps.open,
      });
    }
  }

  componentDidUpdate() {
    const { open } = this.state;
  }

  handleClick = (e) => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { organization } = this.props;

    return (
      <Marker
        optimize={false}
        position={organization.coordinates}
        onClick={this.handleClick}
      >
        {this.state.open &&
          <InfoWindow onCloseClick={this.handleClose}>
            <div>
              <h3>{organization.name}</h3>
              <div>{organization.location}</div>
              <div><a href={`tel:${organization.phone}`}>{organization.phone}</a></div>
            </div>
          </InfoWindow>
        }
      </Marker>
    );
  }
}

export default OrganizationMarker;