import Token from "../Token";
import block from "./block";
import inline from "./inline";

type LinkReference = {
    id: string;
    url: string;
}

type LinkReferenceIndexer = { [id: string]: string };

function findReference(token: Token): LinkReference[] {
    const refs: LinkReference[] = [];
    if (token.type === "reference") {
        refs.push({ id: token.text, url: token.href || "" });
    } 
    
    // child 를 검사한다
    token.children !== undefined && 
    token.children.forEach(child => {
        refs.push(...findReference(child));
    });
    
    return refs;
}

function replaceLink(token: Token, indexer: LinkReferenceIndexer) {
    if (token.type === "link") {
        if (token.href === undefined) {
            if (indexer.hasOwnProperty(token.text)) {
                token.href = indexer[token.text];
            } else {
                token.type = "text";
                token.text = "[" + token.text + "]";
            }
        } 
    }

    // child 를 검사한다
    token.children !== undefined && 
    token.children.forEach(child => replaceLink(child, indexer));
}

function processReference(root: Token) {
    // reference 들을 모두 찾는다
    const refs = findReference(root);
    // reference 을 인덱스 오브젝트로 바꾼다
    const indexer: LinkReferenceIndexer = {};
    refs.forEach(ref => indexer[ref.id] = ref.url);

    // 레퍼런스를 사용하는 url 링크를 교체한다
    replaceLink(root, indexer);
}


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
        processReference(root);
    }
    return root;
}