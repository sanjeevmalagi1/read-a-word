import React from "react";
import ReactDOM from "react-dom";

import HomeContainer from "./js/components/container/HomeContainer.jsx";

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<HomeContainer />, wrapper) : false;
