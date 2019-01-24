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
    if(prevProps.open !== this.props.open){
      this.setState({open: this.props.open})
    }
  }

  scrollToElement = (e) => {
    /*this.props.setOpenMarker(this.props.orgIndexes[0])
    if(this.props.orgIndexes.length === 1){
      this.props.scrollToElement(this.props.orgIndexes[0])
    }*/
    this.setState({ open: true });
  }

  handleClickOfInfoWindow = (e) => {
    this.props.scrollToElement(e.currentTarget.id)
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    let {resource} = this.props;
    console.log(this.props);
    return (
      <Marker
        optimize={false}
        position={resource.coordinates}
        onClick={this.scrollToElement}
      >

      {this.state.open &&
          <InfoWindow onCloseClick={this.handleClose}>
              <div>
              {resource.groupedResource.map( resource  =>
                  <div key={resource.id} id={resource.id} onClick={this.handleClickOfInfoWindow}>
                    <h3>{resource.name}</h3>
                    <div>{resource.combinedaddress}</div>
                    <div><a href={`tel:${resource.phone}`}>{resource.phone}</a></div>
                 </div>)}
            </div>
          </InfoWindow> }

      </Marker>
    );
  }
}

export default OrganizationMarker;
