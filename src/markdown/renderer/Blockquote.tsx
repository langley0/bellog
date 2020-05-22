import React from "react";
import { MDComponent } from "./Interface";

const Blockquote: MDComponent =  function ({children}) {
    return  <blockquote>{ children} </blockquote>
}

export default Blockquote;