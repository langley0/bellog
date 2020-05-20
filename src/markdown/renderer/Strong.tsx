import React from "react";

export default function Strong(props: { children?: React.ReactNode }) {
    const { children } = props;
    return <strong>{ children } </strong>
}
