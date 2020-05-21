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

export default function inline(src: string): Token[] {
    const tokens: Token[] = [];
    let prevText = "";
    
    while(src.length > 0) {
        let token: Token | null = null;
        for(const rule of rules) {
            token = rule(src);
            if (token !== null) {
                if (token.type !== "inlinecode") { 
                    // inline 토큰을 반복해서 해석한다
                    // 단 inlinecode 는 내부 텍스트를 더이상 수정하지 않는다
                    const childrenOfChild = inline(token.text);
                    token.children = childrenOfChild;    
                }

                src = src.substring(token.raw.length);
                break;
            }
        }

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
        }
    }

    if (prevText !== "") {
        tokens.push({ type: "text", raw: prevText, text: prevText });
        prevText = "";
    }
    
    return tokens
}