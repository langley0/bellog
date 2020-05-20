import Token from "../Token";
import block from "./block";
import inline from "./inline";

function processInline(token: Token) {
    if (token.text !== "") {
        // 텍스트가 있는 것은 일단 inline 분해를 해봐야 한다
        const children = inline(token.text);
        token.children = children;
    } 
}

function processBlock(block: Token) {
    // children 들을 검사한다
    if (block.children !== undefined && block.children.length > 0) {
        block.children.forEach(child => processBlock(child));
    } else {
        // 코드 타입은 내부 텍스트를 별도로 수정하지 않는다
        if (block.type === "code") { return; }
        processInline(block);
    }
}

export default function parser(src: string): Token | null {
    const root = block(src);
    if (root !== null) {
        processBlock(root);
    }
    return root;
}