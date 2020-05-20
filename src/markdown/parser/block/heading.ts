import Token from "../../Token";
import { getLine, getIndent, isSpace } from "../utils";

export default function heading(src: string): Token | null {
    // heading level 을 구한다
    const line = getLine(src);
    const indent = getIndent(line);

    // 인덴트가 4 이상이라면 코드블럭이다
    if (indent >= 4) { return null; }
    src = line.trim();

    // # 의 level 갯수를 센다
    let level = 0;
    let pos = 0;
    while(pos < src.length && src.charAt(pos) === "#") {
        level++;
        pos++;
    }

    // 레벨이 없다면 헤딩블럭이 아니다
    if (level === 0) { return null; }

    // 레벨의 최대값은 6이다
    if (level > 6 ) { return null; }

    // # 이 다음에는 빈칸이 와야 오고 그다음에 내용이 기입되어야 한다
    if (isSpace(src.charAt(pos++)) === false) { return null; }
    
    return {
        type: "heading",
        raw: line,
        text: src.substring(pos),
        depth: level,
    }
}