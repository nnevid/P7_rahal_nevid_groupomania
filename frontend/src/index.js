import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer  from "./redux/reducers";
import thunk from "redux-thunk";
import { getUsers } from "./redux/actions/users.actions";
import { getPosts } from "./redux/actions/post.actions";


const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk))
 );

store.dispatch(getUsers());
store.dispatch(getPosts());


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
