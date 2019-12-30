import React from "react";
import ReactDOM from "react-dom";

// import 'bulma/css/bulma.css';

import PlayerContainer from "./js/components/container/PlayerContainer.jsx";

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<PlayerContainer />, wrapper) : false;
