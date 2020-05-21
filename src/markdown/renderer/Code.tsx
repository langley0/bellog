import React from "react";
import { MDComponent } from "./Interface";

const Code: MDComponent = function ({ children }) {
    // token 에서 language 를 뽑을수 있을까?
    return <code className="inlincode">{ children }</code>
}

export default Code;