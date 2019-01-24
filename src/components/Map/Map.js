import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import OrganizationMarker from './OrganizationMarker';

const Map = withScriptjs(withGoogleMap( props => (
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
                () = > {
                    this.orgMarkers = []
                }

                {
                    props.resource.filter(resource => resource.coordinates).map( (resource, index) =>
                       <OrganizationMarker
                            //scrollToElement={props.scrollToElement}
                            //setOpenMarker={props.setOpenMarker}
                            key={index}
                            //open={resource.showInfo}
                            resource={resource}
                        />
                    )
                }
                () => {
                    this.orgMarkers
                }
                }
              )
            }
      </MarkerClusterer>
        </GoogleMap>
    )));

export default Map;
