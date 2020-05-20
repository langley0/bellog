import React from "react";

export default function (props: { children: React.ReactNode }) {
    const { children } = props;
    return <div>{ children } </div>
}
