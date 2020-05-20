import React from "react";

export default function (props: { children: React.ReactNode, token: any }) {
    const { token, children } = props;
    return (<a href={token.href}>{children}</a>)
}
