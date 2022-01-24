import "./App.css";

import React from "react";

import routes from "./routes";
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <>
      <Nav />
      {routes}
    </>
  );
}

export default App;
