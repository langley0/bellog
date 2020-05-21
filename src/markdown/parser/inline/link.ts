import Token from "../../Token";
import { getIndent } from "../utils";
import e from "express";

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

    let label = findBraket(src.substring(pos + 1), "[]");
    if (label === null) { return null; }
    pos += label.length + 1;
    label = label.substring(0, label.length -1)
    
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
    } else if (leftParen === "[" ) {
        const reference = findBraket(src.substring(pos+1), "[]");
        if (reference !== null) {
            pos += reference.length + 1;
            href = reference.substring(0, reference.length - 1);
        } 
    } 

    if (href === "") {
        // href 가 얻어지지 않았다면 label 과 같은 이름을 사용한다
        // reference link 로 간주한다
        href = label;
    }

    return {
        type: "link",
        raw: src.substring(0, pos),
        text: label,
        href: href,
    }
}