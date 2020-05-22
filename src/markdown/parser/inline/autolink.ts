import Token from "../../Token";

const AUTOLINK_RE = /^(https?):\/\/[^\s$.?#].[^\s]*$/;
const EMAIL_RE = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function type1(src: string): Token | null {
    let pos = 0;
    const max = src.length;
    // <link> 로 된 형태이다
    // < 로 시작하는것을 체크한다
    if (pos < max && src.charAt(pos++) !== "<") { return null; }

    const found = src.indexOf(">", pos);
    // > 문자가 존재하는지 확인한다
    if (found < 0) {return null;}
    const linkText = src.substring(pos, found).trim();
    if (AUTOLINK_RE.test(linkText)) {
        return {
            type: "link",
            raw: src.substring(0, found+1),
            text: linkText,
            href: linkText,
        };
    } 
    else if (EMAIL_RE.test(linkText)) {
        return {
            type: "email",
            raw: src.substring(0, found+1),
            text: linkText,
            href: linkText,
        };
    }
    else {
        // link 문자가 아니다
        return null;
    }
}

function type2(src: string): Token | null {
    let pos = 0;
    const max = src.length;
    // <link> 로 된 형태이다
    // < 로 시작하는것을 체크한다
    if (src.substring(0, 4) === "http") {
        // 빈칸까지 읽는다
        const isSpace = function (char: string) {
            return char === " " || char === "\n" || char ==="\t";
        }
        while (pos < max && isSpace(src.charAt(pos++)) === false) {}
        const link = src.substring(0, pos);
        if (AUTOLINK_RE.test(link)) {
            return {
                type: "link",
                raw: link,
                text: link,
                href: link,
            };
        } 
    } 

    return null;
}

export default function (src: string): Token | null {
    return type2(src);
}