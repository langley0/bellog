import Token from "../../Token";
import { getLine } from "../utils";

export default function (src: string) : Token | null {
    // 다음줄이 비어있을때까지 하나의 문단으로 본다
    const line = getLine(src);
    return {
        type: "paragraph",
        raw: line,
        text: line.trim(), 
    }
}