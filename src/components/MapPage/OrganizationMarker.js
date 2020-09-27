import React from "react";
import { renderToString } from "react-dom/server";

// returns the string needed for the google maps API infoWindow content
export default groupedResource => {
  return renderToString(
    <div>
      {groupedResource.groupedResources.map(resource => (
        <div key={resource.id} id={`infoWindow${resource.id}`}>
          <h3>{resource.name}</h3>
          <div>{resource.combinedaddress}</div>
          <div>{resource.tags}</div>
          <div>
            <a href={`tel:${resource.phone}`}>{resource.phone}</a>
          </div>
        </div>
      ))}
    </div>
  );
};
