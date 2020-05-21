import Token from "../../Token";

// backtick 을 사용한 inline code 파싱
export default function (src: string): Token | null {
    let pos = 0;
    const max = src.length;
    // 빈칸을 스킵한다
    if (pos < max && src.charAt(pos) === " ") { pos++; }
    if (src.charAt(pos++) !== "\n") { return null; }
    
    return {
        type: "br",
        raw: src.substring(0, pos),
        text: "",
    }
}