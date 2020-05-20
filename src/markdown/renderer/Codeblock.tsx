import React from "react";
import { MDComponent } from "./Interface";


const codeStyle = {
    backgroundColor: "rgba(0, 0, 0)",
    color: "white",
    padding: "2px 4px",
    display: "block",
}

const Codeblock: MDComponent = function ({ children }) {
    return <pre><code style={codeStyle}>{ children } </code></pre>
}

export default Codeblock;