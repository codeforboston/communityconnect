import { createStore, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      // Redux middleware that spits an error
      // when you try to mutate your state either inside a dispatch or between dispatches.
      reduxImmutableStateInvariant()
    )
  );
}
