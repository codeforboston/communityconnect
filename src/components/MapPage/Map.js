import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import OrganizationMarker from "./OrganizationMarker";
import { compose, lifecycle } from "recompose";

const styles = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [
      {
        weight: "2.00"
      }
    ]
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#9c9c9c"
      }
    ]
  },
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#372305"
      },
      {
        saturation: "-25"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 45
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#eeeeee"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7b7b7b"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#46bcec"
      },
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#c8d7d4"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#070707"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  }
];

const Map = compose(
  lifecycle({
    componentWillMount() {
      this.setState({
        zoomToMarkers: map => {
          const bounds = new window.google.maps.LatLngBounds();
          map.props.children.props.children.forEach(child => {
            bounds.extend(
              new window.google.maps.LatLng(
                child.props.resource.coordinates.lat,
                child.props.resource.coordinates.lng
              )
            );
          });
          map.fitBounds(bounds);
        }
      });
    }
  }),

  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    {...props}
    ref={props.zoomToMarkers}
    defaultZoom={5}
    defaultOptions={{
      styles: styles
    }}
  >
    <MarkerClusterer
      averageCenter={true}
      enableRetinaIcons={true}
      gridSize={60}
      ref={props.onMarkerClick}
      defaultMaxZoom={16}
    >
      {props.resource
        .filter(resource => resource.coordinates)
        .map((resource, index) => (
          <OrganizationMarker
            key={index}
            open={resource.showInfo}
            resource={resource}
          />
        ))}
    </MarkerClusterer>
  </GoogleMap>
));
export default Map;
