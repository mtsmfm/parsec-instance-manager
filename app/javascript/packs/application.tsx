
import * as React from "react";
import { render } from "react-dom"
import "../utils/firebase";
import { App } from "../components/App"

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById("app"));
});
