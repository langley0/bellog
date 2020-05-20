import React from "react";
import { MDComponent } from "./Interface";

const codeStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: "2px 4px",
}

const Code: MDComponent = function ({ children }) {
    return <code style={codeStyle}>{ children } </code>
}

export default Code;