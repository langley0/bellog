import Token from "../../Token";

function getOrdered(src: string): { raw: string, order: number } | null {
    let pos = 0;
    const max = src.length;
    const firstChar = src.charAt(pos++);
    if (firstChar < "0" || firstChar > "9") { return null; }
    while(pos < max) {
        const char = src.charAt(pos++);

        // 숫자인경우는 계속해서 읽어나간다
        if (char >= "0" && char <= "9") { continue; }
        if (char === ")" || char === ".") {
            if (src.charAt(pos++) !== " ") {
                // 1.test 는 올바른 리스트아이템 형식이 아니다
                return null;
            } 

            return {
                raw: src.substr(0, pos),
                order: Number(src.substr(0, pos -2))
            } 
        }
        // 그외의 문자가 오면 리스트가 아니다
        return null;
    }
    // 문장 끝까지 읽은경우. 
    return null;
}


export default function list(src: string, prev: Token): Token | null {
    let pos = 0;
    const max = src.length;
    while(pos < max && src.charAt(pos) === " ") {
        pos++;
    }
    // indent 가 4 이상이면 code block 이다
    if ( pos >= 4) { return null; }
    
    let isOrdered = false;
    let orderNumber: number = 0;
    const ordered = getOrdered(src.substring(pos));
    if (ordered !== null) {
        pos += ordered.raw.length;
        isOrdered = true;
        orderNumber = ordered.order;

    } else {
        // 마커는 "-", "+" 둘중에 하나를 사용가능하다
        const marker = src.charAt(pos++);
        if (marker !== "-" && marker !== "+") { return null; }
        // 여기서 depth 를 계산해야겠지만 일단 지금은 처리하지 않는다.
        if (src.charAt(pos++) !== " ") { return null; }
    }

    // 리스트 아이템의 내용의 시작위치
    const contextBegin = pos;
    // 문장의 끝까지 읽는다
    while(pos < max && src.charAt(pos++) !== "\n") { };

    const listItem: Token = {
        type: "listitem",
        raw: src.substring(0, pos),
        text: src.substring(contextBegin, pos -1)
    }
    
    // 이전 객체가 list 라면 동일한 형식으로 진행되는지 살펴본다
    if (prev.type === "list" 
        // 기존의 리스트 타입과 일치하여야 한다
        && prev.ordered === isOrdered) {
        
            prev.children && prev.children.push(listItem);

        // dumy 를 반환한다
        return {
            raw: src.substring(0, pos),
            text: "",
        };
    }

    // 새로운 리스트를 생성한다
    return {
        type: "list",
        raw: src.substring(0, pos),
        text: "",
        ordered: isOrdered,
        orderStart: orderNumber,
        children: [ listItem ]
    };
}