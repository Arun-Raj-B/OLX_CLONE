import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./app/store";
import firebase from "./firebase/config";
import { FirebaseContext } from "./store/Context";
import Context from "./store/Context";

ReactDOM.render(
  <BrowserRouter>
    {/* <Provider store={store}> */}
    <FirebaseContext.Provider value={{ firebase }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>

    {/* </Provider> */}
  </BrowserRouter>,

  document.getElementById("root")
);
