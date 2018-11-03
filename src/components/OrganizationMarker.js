import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

export class OrganizationMarker extends Component {
  state = {
    open: false,
  }

  constructor(props) {
    super(props);
    this.state.open = props.open;
    this.orgsArray = []

  }


  componentDidUpdate(prevProps){
    if(prevProps.open != this.props.open){
      this.setState({open: this.props.open})
    }
  }




  scrollToElement = (e) => {
    this.props.setOpenMarker(this.props.orgIndexes[0])
    if(this.props.orgIndexes.length == 1){
      this.props.scrollToElement(this.props.orgIndexes[0])
    }
  }

  handleClickOfInfoWindow = (e) => {
    console.log(e.currentTarget.id)
    this.props.scrollToElement(e.currentTarget.id)
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {

    if(this.orgsArray.length == 0){
      for(var orgIndex of this.props.orgIndexes){
        this.orgsArray.push([this.props.organizations[orgIndex], orgIndex])
      }
    }

    return (
      <Marker
        optimize={false}
        position={this.orgsArray[0][0].coordinates}
        onClick={this.scrollToElement}
      >

      {this.state.open &&
          <InfoWindow onCloseClick={this.handleClose}>
              <div>
                {this.orgsArray.map(([organization, orgIndex])  =>
                  <div key={organization.id} id={orgIndex} onClick={this.handleClickOfInfoWindow}>
                    <h3>{organization.name}</h3>
                    <div>{organization.location}</div>
                    <div><a href={`tel:${organization.phone}`}>{organization.phone}</a></div>
                 </div>)}
            </div>
          </InfoWindow> }

      </Marker>
    );
  }
}

export default OrganizationMarker;
