import React from "react";
import Token, { TokenType } from "../Token";
import { MDComponent} from "./Interface";
import HLine from "./HLine";
import Text from "./Text";
import Strong from "./Strong";
import Em from "./Em";
import Link from "./Link";
import Heading from "./Heading";
import Blockquote from "./Blockquote";
import Strikethrough from "./Strikethrough";
import Code from "./Code";
import Codeblock from "./Codeblock";
import Image from "./Image";
import List from "./List";
import EMail from "./EMail";

let keyIndex = 0;
function nextkey(): string {
    return "md-key-" + (++keyIndex) + "-" + Math.floor(Math.random() * 100);
}

function getComponent(key: TokenType): (MDComponent | null) {
    const Components: { [key:string]: MDComponent } = {
        hr: HLine,
        paragraph: (props) => <p>{ props.children }</p>,
        text: Text,
        strong: Strong,
        em: Em,
        br: () => <br/>,
        list: List,
        listitem: ({children}) => <li>{children}</li>,
        link: Link,
        email: EMail,
        heading: Heading,
        lheading: Heading,
        code: Codeblock,
        inlinecode: Code,
        strikethrough: Strikethrough,
        blockquote: Blockquote,
        image: Image,
    }
        
    return Components[key];
}

const TokenComponent: MDComponent = function Element({ token }) {
    // 토큰을 렌더링한다
    const ComponentType =  getComponent(token.type!);
    if (ComponentType) {
        return (
            <ComponentType token={token}> 
                {token.children 
                    ? token.children.map(child => <TokenComponent key={nextkey()} token={child} />)
                    : token.text}
            </ComponentType>
        );
    } 
    else {
        return null;
    }
}

const Viewer = (props: {compiled: Token[]}): React.ReactElement => {
    const { compiled } = props;
    return (
        <>
            { compiled.map(child => <TokenComponent key={nextkey()} token={child}/>) }
        </>
    );
}

export default function renderer(compiled: Token) {
    return <Viewer compiled={compiled?.children || []}/>;
}