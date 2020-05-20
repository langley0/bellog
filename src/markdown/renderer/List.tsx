import React from "react";
import Token from "../parser/Token";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function (props: { list: Token }) {
    const { list } = props;
    return (
    <ul>
        {list.children && 
        list.children.map(child => <li>{child.text}</li>)}
    </ul>
    );
}
