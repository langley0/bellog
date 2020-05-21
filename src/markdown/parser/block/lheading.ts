// L-Heading
//
// [ h1 title ]
// TITLE
// =====  
//
// [ h2 title ]
// Title
// -----
// 
// 밑줄 (= 혹은 -) 의 길이는 상관없다. 단 다른 문제가 섞이면 안된다

import Token from "../../Token";

export default function(src: string, prev: Token): Token | null {

    let pos = 0;
    const max = src.length;
    const marker = src.charAt(pos++);
    if (marker !== "=" && marker !== "-") {
        return null;
    }
    const depth = marker === "=" ? 1 : 2;
    
    while (pos < max && src.charAt(pos) === marker) {
        pos++
    }

    // 다른문자가 있다면 lheading 이 아니다
    if (src.charAt(pos++) !== "\n") { return null; }

    // 이전 블럭이 일반 텍스트여야 한다
    if (prev.type !== "paragraph") { return null; }
    // 한줄로 구성되어야 한다. 두줄이상은 일반텍스트로 간주한다
    if (prev.text.indexOf("\n") >= 0) { return null; }

    // 이전 토큰을 변경한다
    prev.type = "lheading";
    prev.depth = depth;
        
    // empty 블럭을 반환한다
    return {
        raw: src.substring(0, pos),
        text: "",
    }
    
    
}