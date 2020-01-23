import React from "react";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import configureStore from "./store/configureStore";
import AppContainer from "./App/AppContainer";
import PrintPage from "./components/PrintPage/PrintPageContainer";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.scss";

library.add(fab, fas);

const getRoutes = store => (
  <div>
    <Switch>
      <Route exact path="/admin" component={AppContainer} />

      <Route
        exact
        path="/:resource/"
        component={AppContainer}
        dispatch={store.dispatch}
      />

      <Route
        exact
        path="/:resource/print"
        component={PrintPage}
        dispatch={store.dispatch}
      />

      <Route
        exact
        path="/:resource/admin"
        component={AppContainer}
        dispatch={store.dispatch}
      />
      <Redirect exact from="/" to="/revere" />

      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>{getRoutes(store)}</BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
