import queryString from "query-string";
import _ from "lodash";

export const getQueryResources = () => {
  const query = queryString.parse(window.location.search, {
    arrayFormat: "comma",
  });

  return _.castArray(query.resources || []);
};
export const encodeResources = resources =>
  queryString.stringify({ resources }, { arrayFormat: "comma" });
