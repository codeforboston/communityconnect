import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

export class OrganizationMarker extends Component {
  state = {
    open: false,
  }

  constructor(props) {
    super(props);


    this.state.open = props.open;

  }


  componentDidUpdate(prevProps){
    if(prevProps.open != this.props.open){
      this.setState({open: this.props.open})
    }
  }


  handleClick = (e) => {

    this.props.setOpenMarker(this.props.id)
    this.props.handleClick(this.props.organization.id)
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
