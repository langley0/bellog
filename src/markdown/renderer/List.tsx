import React from "react";
import { MDComponent } from "./Interface";


const List: MDComponent = function({ token, children }) {
    if(token.ordered === true) {
        return <ol start={token.orderStart}>{children}</ol>
    } else if (token.ordered === false) {
        return <ul>{children}</ul>
    }
    return null;
}
export default List;