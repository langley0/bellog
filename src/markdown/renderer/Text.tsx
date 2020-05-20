import React from "react";

export default function (props: any) {
    const { token } = props;
    return <span>{ token.text } </span>
}
