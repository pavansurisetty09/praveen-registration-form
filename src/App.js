import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register";
import MyVerticallyCenteredModal from "./components/MyVerticallyCenteredModal";
import Modalpop from "./components/Modalpop";

class App extends Component {
  render() {
    return (
      <div>
        <Register />
        {/* <MyVerticallyCenteredModal /> */}
        {/* <Modalpop /> */}
      </div>
    );
  }
}

export default App;
