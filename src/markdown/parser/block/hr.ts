import Token from "../../Token"; // 나중에 위치를 변경히지

export default function (src: string): Token | null{
    let pos = 0;
    const max = src.length;

    // 시작 공백 4개 이상은 codeblock 이다
    while(pos < max && src.charAt(pos) === " ") { pos++; }
    if (pos > 3) { return null; }

    // 구분자는 *, -, _ 중에 하나이어야 한다
    const marker = src.charAt(pos);
    if (marker !== "-" && marker !== "_" && marker !=="*") {
        return null;
    }

    let count = 0;
    while(pos < max) { 
        const char = src.charAt(pos++);
        // 구분자의 반복된 수를 기록한다
        if (char === marker) {
            count++;
        } else if (char === " ") { 
            // 구분자 사이의 빈칸은 무시하게 된다
        } else if (char === "\n") {
            // 줄바꿈이 나타나면 블럭을 완성한다
            break;
        } else {
            // 그외의 문자가 등장하면 hr 블럭이 아니다
            return null;
        }
    }

    // 구분자는 3개이상 등장하여야 한다
    if (count < 3) { return null; }
    return {
        type: "hr",
        raw: src.substring(0, pos),
        text: "",
    }
}