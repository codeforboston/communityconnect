import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";
import housing from '../../images/icons/house.png'
import baby from '../../images/icons/baby.png'
import violence from '../../images/icons/violence.png'
import education from '../../images/icons/education.png'
import farmers from '../../images/icons/farmer.png'
import hospital from '../../images/icons/hospital.png'
import healthyFood from '../../images/icons/diet.png'
import parks from '../../images/icons/tree.png'
import church from '../../images/icons/church.png'
import youth from '../../images/icons/youth.png'
import couple from '../../images/icons/couple.png'

class OrganizationMarker extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    resource: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    };
  }
  

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
    let { resource } = this.props;
    let iconImg = resource.groupedResource[0].categories;
    let iconMarker = null;
    switch(iconImg) {
      case iconImg = 'Job Training and Opportunity':
      case iconImg = "Childhood Support": 
      case iconImg = "Transitioning and Integrating":
      case iconImg = "Affordable Housing":
      iconMarker = housing
      break;
      case iconImg = "Child Care" :
      iconMarker = baby
      break;
      case iconImg = "Domestic Violence Support":
      iconMarker = violence
      break;
      case iconImg = "Education":
      iconMarker = education;
      break;
      case iconImg = 'Farmers Market':
      case iconImg = "Community Markets":
      iconMarker = farmers;
      break;
      case iconImg = "Health and Wellbeing":
      case iconImg = "Health Care Centers and Clinics":
      iconMarker = hospital;
      break;
      case iconImg = "Healthy Food Options and Food Pantries":
      iconMarker = healthyFood
      break;
      case iconImg = "Parks and Community Gardens":
      iconMarker = parks
      break;
      case iconImg = "Religious and Cultural Center":
      iconMarker = church
      break;
      case iconImg = "Youth and Adolescence":
      iconMarker = youth
      break;
      case iconImg = "Elderly Support":
      iconMarker = couple
      break;
      
    }
  

   
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
              {resource.groupedResource.map(resourceData => (
                <div
                  key={resourceData.id}
                  id={resourceData.id}
                  onClick={this.handleClickOfInfoWindow}
                  style={{ padding: "25px" }}
                >
                  <h3>{resourceData.name}</h3>
                  <div>{resourceData.combinedaddress}</div>
                  <div>{resourceData.tags}</div>
                  <div>
                    <a href={`tel:${resourceData.phone}`}>
                      {resourceData.phone}
                    </a>
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
