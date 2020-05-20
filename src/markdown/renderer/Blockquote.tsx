import React from "react";
import { MDComponent } from "./Interface";

const blockquoteStyle = {
    borderLeft: "5px solid rgba(0, 0, 0, 0.1)",
    paddingLeft: "1.5em",
    margin: "1.2em 0",
}

const Blockquote: MDComponent =  function ({children}) {
    return  <blockquote style={blockquoteStyle}>{ children} </blockquote>
}

export default Blockquote;