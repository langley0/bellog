// reference 스타일의 링크는  [label][id] 로 정의된다
// [label] 로 정의된 경우는 id 는 label 과 동일하게 된다
// [label][] 도 같은 정의이다
// 여기서 id 는 [id]:url 로 정의되게 된다
// label 클릭시 연결된 id 의 url 로 이동하게 된다

import Token from "../../Token";


export default function reference(src: string): Token | null {
    let pos = 0;
    const max = src.length;

    while(pos < max && src.charAt(pos)=== " ") { pos++; }
    
    // indent 가 4칸이상이라면 code 블럭이다
    if (pos >= 4) { return null; }
    
    // 레퍼런스는 [ 로 시작한다
    if (src.charAt(pos++) !== "[") { return null; }
    const idBegin = pos;
    while (pos < max && src.charAt(pos++) !== "]") {  }
    if (pos === max ) { return null; }

    const id = src.substring(idBegin, pos - 1).trim();
    
    // : 이 나오면 선언부이다
    if(src.charAt(pos++) === ":") {
        const contentBegin = pos;
        // 선언부이다
        while (pos < max && src.charAt(pos++) !== "\n") { }
        const url = src.substring(contentBegin, pos - 1 ).trim();

        return {
            type: "reference",
            raw: src.substring(0, pos),
            text: id,
            href: url,
        };
    } else {
        return null;
    }
}