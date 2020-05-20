import Token from "../../Token";
import { getLine, getIndent, isEmptyLine } from "../utils";

export default function blockquote(src: string): Token | null {
    const texts = [];

    // 다음 줄을 읽는다
    let pos = 0;
    let line = getLine(src);
    const indent = getIndent(line);
    // 4 이상은 코드블럭이다
    if (indent >= 4) { return null;}
    while(line !== null) {
        // 빈라인이 나타나면 blockquote 를 중단한다
        if (isEmptyLine(line)) { break; }
        if (line.charAt(indent) !== ">") { break; }

        // > 뒤에 오는 빈칸까지 마커로 인식한다
        const space = line.charAt(indent + 1);
        if (space === " " || space === "\t") {
            texts.push(line.substring(indent + 2));
        } else {
            texts.push(line.substring(indent + 1));
        }
                 
        pos += line.length;
        line = getLine(src.substring(pos));
    }

    if (texts.length > 0) {
        return {
            type: "blockquote",
            raw: src.substring(0, pos),
            text: texts.join(""),
        }
    } else {
        return null;
    }
}