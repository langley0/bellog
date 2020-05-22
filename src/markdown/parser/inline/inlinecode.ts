import Token from "../../Token";

// backtick 을 사용한 inline code 파싱
export default function (src: string): Token | null {
    let pos = 0;
    if (src.charAt(pos++) !== "`") { return null; }
    const max = src.length;
    while(pos < max && src.charAt(pos++) !== "`") {
        // ...
    }

    if (pos <= 2) {
        // ` 하나만 있거나 `` 로 연속해서 있는 경우는 코드블럭으로 인식하지 않는다
        return null;
    }
    
    return {
        type: "inlinecode",
        raw: src.substring(0, pos),
        text: src.substring(1, pos-1),
    }
}