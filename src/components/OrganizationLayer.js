import React, { Component } from 'react';
import { Layer, Feature } from 'react-mapbox-gl';

const paint = {
  'circle-radius': 10,
  'circle-color': '#FF0000'
}

class OrganizationLayer extends Component {
  render() {
    return(
      <Layer type='circle' id='organizations' paint={paint}>
        {
          this.props.organizations.map(org =>
            <Feature
              key={org.id}
              coordinates={[org.longitude, org.latitude]}
              onMouseEnter={this.props.markerHover.bind(null, org.id)}
              onMouseLeave={this.props.markerEndHover.bind(null, org.id)}
              onClick={this.props.onOrganizationClick.bind(null, org.id)}
            />
          )
        }
      </Layer>
    );
  }
}

export default OrganizationLayer;
