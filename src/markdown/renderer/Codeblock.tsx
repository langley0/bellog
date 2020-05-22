import React from "react";
import { MDComponent } from "./Interface";
import { Prism as SyntaxHighlighter }  from "react-syntax-highlighter";
// test
const codeStyle = 
{
"code[class*=\"language-\"]": {
    "color": "#ccc",
    "background": "none",
    "fontFamily": "Consolas, Monaco, monospace",
    "textAlign": "left",
    "whiteSpace": "pre",
    "wordSpacing": "normal",
    "wordBreak": "normal",
    "wordWrap": "normal",
    "lineHeight": "1.5",
    "MozTabSize": "4",
    "OTabSize": "4",
    "tabSize": "4",
    "WebkitHyphens": "none",
    "MozHyphens": "none",
    "msHyphens": "none",
    "hyphens": "none"
},
"pre[class*=\"language-\"]": {
    "color": "#ccc",
    "background": "none",
    "fontFamily": "Consolas, Monaco, monospace",
    "textAlign": "left",
    "whiteSpace": "pre",
    "wordSpacing": "normal",
    "wordBreak": "normal",
    "wordWrap": "normal",
    "lineHeight": "1.5",
    "MozTabSize": "4",
    "OTabSize": "4",
    "tabSize": "4",
    "WebkitHyphens": "none",
    "MozHyphens": "none",
    "msHyphens": "none",
    "hyphens": "none",
    "padding": "0",
    "margin": "0",
    "overflow": "auto"
},
":not(pre) > code[class*=\"language-\"]": {
    "background": "#2d2d2d",
    "padding": ".1em",
    "borderRadius": ".3em",
    "whiteSpace": "normal"
},
"comment": {
    "color": "#999"
},
"block-comment": {
    "color": "#999"
},
"prolog": {
    "color": "#999"
},
"doctype": {
    "color": "#999"
},
"cdata": {
    "color": "#999"
},
"punctuation": {
    "color": "#ccc"
},
"tag": {
    "color": "#e2777a"
},
"attr-name": {
    "color": "#e2777a"
},
"namespace": {
    "color": "#e2777a"
},
"deleted": {
    "color": "#e2777a"
},
"function-name": {
    "color": "#6196cc"
},
"boolean": {
    "color": "#f08d49"
},
"number": {
    "color": "#f08d49"
},
"function": {
    "color": "#f08d49"
},
"property": {
    "color": "#f8c555"
},
"class-name": {
    "color": "#f8c555"
},
"constant": {
    "color": "#f8c555"
},
"symbol": {
    "color": "#f8c555"
},
"selector": {
    "color": "#cc99cd"
},
"important": {
    "color": "#cc99cd",
    "fontWeight": "bold"
},
"atrule": {
    "color": "#cc99cd"
},
"keyword": {
    "color": "#cc99cd"
},
"builtin": {
    "color": "#cc99cd"
},
"string": {
    "color": "#7ec699"
},
"char": {
    "color": "#7ec699"
},
"attr-value": {
    "color": "#7ec699"
},
"regex": {
    "color": "#7ec699"
},
"variable": {
    "color": "#7ec699"
},
"operator": {
    "color": "#67cdcc"
},
"entity": {
    "color": "#67cdcc",
    "cursor": "help"
},
"url": {
    "color": "#67cdcc"
},
"bold": {
    "fontWeight": "bold"
},
"italic": {
    "fontStyle": "italic"
},
"inserted": {
    "color": "green"
}
};
const divSylte = {
    backgroundColor: "#111",
    borderRadius: ".3em",
    margin: ".5em 0",
    padding: "1em",
    overflow: "auto",
}

const Codeblock: MDComponent = function ({ token, children }) {
    // token 에서 language 를 뽑을수 있을까?
    return <div style={divSylte}>
            <SyntaxHighlighter 
            language={token.language}
            style={codeStyle}
            >
            { children } 
        </SyntaxHighlighter>
    </div>
}

export default Codeblock;