import React from "react";
import { MDComponent } from "./Interface";

const Strikethrough: MDComponent = function ({ children }) {
    return <s>{ children } </s>
}

export default Strikethrough;