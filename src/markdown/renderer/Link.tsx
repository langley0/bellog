import React from "react";
import { MDComponent } from "./Interface";

const Link: MDComponent =  function ({ token, children }) {
    return (<a href={token.href}>{children}</a>)
}

export default Link;