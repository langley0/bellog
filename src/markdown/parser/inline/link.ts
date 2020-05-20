import Token from "../../Token";
import { getIndent } from "../utils";

function findBraket(src: string, brakets: string): string | null {
    let pos = 0;
    const max = src.length;
    let level = 1;
    const target = brakets.charAt(1);

    while(pos < max) {
        const char = src.charAt(pos++);
        if (char === target) {
            level--;
        }
        if (level === 0) {
            return src.substring(0, pos);
        }
    }

    return null;
}

export default function link(src: string): Token | null {
    let pos = getIndent(src);
    const leftBracket = src.charAt(pos);
    if (leftBracket !== "[") { return null; }

    const label = findBraket(src.substring(pos + 1), "[]");
    if (label === null) { return null; }
    pos += label.length + 1;

    let href = "";

    const leftParen = src.charAt(pos);
    if (leftParen === "(") {
        const reference = findBraket(src.substring(pos+1), "()");
        if (reference !== null) {
            pos += reference.length + 1;
            // (href) 의 형식만 인식할수있다
            // (<href> "title") 의 형식은 지금은 사용할 수 없다
            href = reference.substring(0, reference.length - 1);
        } 
    }


    if (href === "") {
        href = label;
    }
    
    return {
        type: "link",
        raw: src.substring(0, pos),
        text: label.substring(0, label.length -1),
        href: href,
    }
}