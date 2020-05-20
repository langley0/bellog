import React from "react";

export default function (props: any) {
    const { children, token } = props;
    if (token.depth) {
        return React.createElement("h" + token.depth, { children });
    } else {
        return null;
    }
}
