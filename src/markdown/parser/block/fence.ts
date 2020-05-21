// fence
// ``` <- backtick 3개 연속
// code~~~
// ```
//-----------------------------------
// fence 타입의 경우 하이라이트를 위해 코드 타입을 지정할수 있다
// ``` js
// var foo = function (bar) {
//   return bar++;
// };
// ```

import Token from "../../Token";

export default function fenceCode(src: string): Token | null {
    let pos = 0;
    const max = src.length;
    const texts: string[] = [];

    // ```로 시작하는 문단을 찾는다
    let fenceCount = 0;
    while(pos + fenceCount < max && src.charAt(pos + fenceCount) === "`") { fenceCount++; }
    if (fenceCount < 3) { return null;}
    pos += fenceCount;

    // ``` 뒤에 문장은 언어를 나타낸다
    const lbegin = pos;
    while(pos < max && src.charAt(pos++) !== "\n") { }
    const lend = pos - 1;
    const language = src.substring(lbegin, lend).trim();
    
    const codeBegin = pos;
    while(pos < max) {
        // ` 가 읽힐때까지 계속 진행한다
        while(pos < max && src.charAt(pos++) !== "`") { }
        
        const begin = pos -1; // 이미 ` 하나를 카운트하였다
        while(pos < max && src.charAt(pos) === "`") { pos++; }
        if (pos === begin + fenceCount && src.charAt(pos++) === "\n") {
            // 종료되었다
            break;
        }
    }

    return {
        type: "code",
        raw: src.substring(0, pos),
        text: src.substring(codeBegin, pos-fenceCount-1),
        language: language,
    }
}