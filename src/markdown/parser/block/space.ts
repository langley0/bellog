import Token from "../../Token";

export default function (src: string): Token | null {
    let pos = 0;
    const max = src.length;
    while(pos < max) {
        const char = src.charAt(pos++);
        if (char === "\n") {
            break;
        } else if (char !== " " && char !== "\t") {
            // 빈칸이 아닌 문자가 있다
            return null;
        }
    }
    return {
        type: "space",
        raw: src.substring(0, pos),
        text: "", 
    }
}