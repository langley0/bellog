import Token from "../../Token";
import { getLine, getIndent } from "../utils";


export default function list(src: string): Token | null {
    const origin = src;
    const indent = getIndent(src);
    // indent 가 4 이상이면 code block 이다
    if ( indent >= 4) { return null; }
    // 마커는 "-", "+" 둘중에 하나를 사용가능하다
    const marker = src.charAt(indent);
    if (marker !== "-" && marker !== "+") { return null; }

    const listItems: Token[] = [];

    // 리스트의 아이템들을 가져온다
    while(src.length > 0) {
        const line = getLine(src);
        // 주어진 line 이 listitem 룰에 만족하는지 알아야한다
        const lineIndent = getIndent(line);
        // - item1
        //   - item2  
        // 위와 같은 경우는 현재 처리할수 없다
        // 현재는 모두 같은 뎁스에서만 처리가 가능하다
        if (lineIndent !== indent) { break; }
        
        // -|+ {inline} 식의 형태를 가져야한다
        const char = line.charAt(lineIndent);
        const char2 = line.charAt(lineIndent + 1);
        if (char !== marker || char2 !== " ") { break;}

        listItems.push({
            type: "listitem",
            raw: "",
            text: line.substring(lineIndent + 2).trim(),
        })

        src = src.substring(line.length);
    }

    if (listItems.length > 0) {
        return {
            type: "list",
            raw: origin.substring(0, origin.length - src.length),
            text: "",
            children: listItems
        }
    } else {
        return null;
    }
}