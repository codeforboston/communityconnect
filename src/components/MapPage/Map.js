import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps';
import {MarkerClusterer} from 'react-google-maps/lib/components/addons/MarkerClusterer';
import OrganizationMarker from './OrganizationMarker';

const Map = withScriptjs(withGoogleMap(props => (
    <GoogleMap
        {...props}
        ref={props.mapRef}
    >
        <MarkerClusterer
            averageCenter={true}
            enableRetinaIcons={true}
            gridSize={60}
            ref={props.onMarkerClick}
            defaultMaxZoom={16}
        >
            {
                props.resource.filter(resource => resource.coordinates).map((resource, index) =>
                    <OrganizationMarker
                        key={index}
                        open={resource.showInfo}
                        resource={resource}
                    />
                )
            }
        </MarkerClusterer>
    </GoogleMap>
)));

export default Map;
