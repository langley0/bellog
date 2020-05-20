// indeted code
//      code ~~~
// ^  ^ - 스페이스 4개는 코드블럭의 시작이다

import Token from "../../Token";

export default function indentedCode(src: string): Token | null {
    let pos = 0;
    const max = src.length;
    
    const texts: string[] = [];
    while(pos < max) {
        let indent = 0;
        while(pos + indent < max && src.charAt(pos + indent) === " ") { 
            indent++;
        }
        
        if (indent < 4) { 
            break; 
        }
        
        pos += indent;
        const start = pos;
        while(pos < max && src.charAt(pos++) !== "\n") {}
        const end = pos;
        texts.push(src.substring(start, end));
    }

    if (pos > 0) {
        return {
            type:"code",
            raw: src.substring(0, pos),
            text: texts.join(""),
        };
    } else {
        return null;
    }
}