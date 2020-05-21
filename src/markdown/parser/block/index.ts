import Token from "../../Token";
import space from "./space";
import hr from "./hr";
import heading from "./heading";
import list from "./list";
import paragraph from "./paragraph";
import blockquote from "./blockquote";
import code from "./code";
import lheading from "./lheading";
import fence from "./fence";
import reference from "./reference";

const rules = [
    space,
    heading,
    lheading,
    code,
    fence,
    list,
    hr,
    blockquote,
    reference,
    paragraph
];

function getNextToken(src: string, lastToken: Token): Token | null {
    for(const rule of rules) {
        const token = rule(src, lastToken);
        if (token !== null) {
            return token;
        }
    }
    return null;
}

export default function block(src: string): Token | null {
    const tokens: Token[] = [];
    const originSrc=  src;
    
    let lastToken: Token = { raw: "", text:"" };
    while(src.length > 0) {
        const token = getNextToken(src, lastToken);
        if (token === null) {
            // 해석할수 없는 경우이다
            break;
        } 

        src = src.substring(token.raw.length);
        if (token.type !== undefined) {
            tokens.push(token);
            lastToken = token;
        }
    }

    return {
        raw: originSrc.substring(0, originSrc.length - src.length),
        text: "",
        children: tokens
    };
}