import Token from "../../Token";

export default function blockquote(src: string, prev: Token): Token | null {
    // 다음 줄을 읽는다
    let pos = 0;
    const max = src.length;
    while(pos < max && src.charAt(pos) === " ") { pos++; }
    // 4칸이상의 빈칸은 코드블럭으로 간주한다
    if (pos >= 4) { return null;}

    let depth = 0;
    while (pos < max && src.charAt(pos) === ">") { 
        depth++;
        pos++;
    }

    // blockquote 는 > 로 시작하여야 한다
    // > 의 수가 뎁스를 만들어낸다
    if (depth === 0) {
        return null;
    }

    // 아래의 두가지 모두 허용한다
    // >text
    // > text
    if (src.charAt(pos) === " ") { pos++ }

    // 라인의 끝까지 읽는다
    const textBegin = pos;
    while(pos < max && src.charAt(pos++) !== "\n") { }

    if (prev.type === "blockquote") {
        let parent = prev;
        depth--;
        while(depth > 0) {
            depth--;
            if (parent.children === undefined) {
                const newParent: Token = {
                    type: "blockquote",
                    raw: "",
                    text: "",
                };
                parent.children = [newParent];
                parent = newParent;
            } 
            else {
                const lastChild = parent.children[parent.children.length - 1];
                if (lastChild.type !== "blockquote") {
                    // 새롭게 추가해서 blokquote child 를 추가한다
                    const newParent: Token = {
                        type: "blockquote",
                        raw: "",
                        text: "",
                    };
                    parent.children.push(newParent)
                    parent = newParent;
                } else {
                    // 새로운 blockquote 이다 
                    parent = lastChild;
                }
            }
        }

        // 부모의 마지막 자식이 paragraph 이면 여기에 추가를 하고 아니면 새로 작성한다
        if (parent.children !== undefined) {
            const lastChild = parent.children[parent.children.length - 1];
            if (lastChild.type === "paragraph") {
                lastChild.text +="\n"+src.substring(textBegin, pos -1);
            } else {
                // 부모의 마지막 child 가 paragraph 가 아니다
                parent.children.push({
                    type: "paragraph",
                    raw: "",
                    text: src.substring(textBegin, pos -1)
                });
            }
        } else {
            parent.children = [{
                type: "paragraph",
                raw: "",
                text: src.substring(textBegin, pos -1)
            }];
        }
        return {
            raw: src.substring(0, pos),
            text: "",
        }
    } else {
        // 새로 작성한다
        return {
            type: "blockquote",
            raw: src.substring(0, pos),
            text: "",
            depth: depth,
            children: [{
                type: "paragraph",
                raw: "",
                text: src.substring(textBegin, pos -1),
            }]  
        }
    }
}