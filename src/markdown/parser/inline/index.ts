import Token from "../../Token";
import bold from "./bold";
import italic from "./italic";
import link from "./link";
import strikethrough from "./strikethrough";
import inlinecode from "./inlinecode";
import image from "./image";
import br from "./br";
import autolink from "./autolink";

const rules = [
    link,
    autolink,
    image,
    inlinecode,
    italic,
    bold,
    strikethrough,
    br,
];

function getNextToken(src: string): Token | null {
    for(const rule of rules) {
        const token = rule(src);
        if (token !== null) {
            return token;
        }
    }
    return null;
}

export default function inline(src: string): Token[] {
    const tokens: Token[] = [];
    let prevText = "";
    
    while(src.length > 0) {
        const token = getNextToken(src);
        if (token === null) {
            // 일반텍스트이다
            //token = { type: "text", raw: src, text: src };
            prevText += src.charAt(0);
            src = src.substring(1);
        }  else {
            if (prevText !== "") {
                tokens.push({ type: "text", raw: prevText, text: prevText });
                prevText = "";
            }

            tokens.push(token);
            src = src.substring(token.raw.length);
            

            // token 을 다시 inline 파싱한다
            // inlinecode 는 별도로 처리하지 않는다
            if (token.type === "inlinecode") { continue; }
            // autolink 의 경우에도 다시 처리하지 않는다
            if (token.type === "link" && token.text === token.href) { continue; }
            
            const tokenChilren = inline(token.text);
            token.children = tokenChilren;
        }
    }

    if (prevText !== "") {
        tokens.push({ type: "text", raw: prevText, text: prevText });
        prevText = "";
    }
    
    return tokens
}