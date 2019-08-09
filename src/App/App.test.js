import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AppContainer from "./AppContainer";

Enzyme.configure({ adapter: new Adapter() });

const store = createStore(
  () => ({ isFetchingResource: false, savedResource: [], resource: [] }),
  ["Use Redux"]
);

test("renders without crashing", () => {
  mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <AppContainer />
      </MemoryRouter>
    </Provider>
  );
});
