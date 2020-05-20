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

const rules = [
    space,
    heading,
    lheading,
    code,
    fence,
    list,
    hr,
    blockquote,
    paragraph
];

export default function block(src: string): Token | null {
    const tokens: Token[] = [];
    const originSrc=  src;
    
    let lastToken: Token = { raw: "", text:"" };
    while(src.length > 0) {
        let token: Token | null = null;
        for(const rule of rules) {
            token = rule(src, lastToken);
            if (token !== null) {
                break;
            }
        }

        if (token === null) {
            // 해석할수 없는 경우이다
            //return null;
            break;
        } 

        if (token.type === "blockquote") {
            const submodule = block(token.text);
            token.children = submodule?.children;
        }


        tokens.push(token);
        src = src.substring(token.raw.length);
        lastToken = token;
    }

    return {
        raw: originSrc.substring(0, originSrc.length - src.length),
        text: "",
        children: tokens
    };
}