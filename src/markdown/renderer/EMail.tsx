import React from "react";
import { MDComponent } from "./Interface";

const EMail: MDComponent =  function ({ token, children }) {
    return (<a href={"mailto:" + token.href}>{children}</a>)
}

export default EMail;
