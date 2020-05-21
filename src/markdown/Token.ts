export type TokenType = "space" | "paragraph" | "code" | "heading" | "hr" | "blockquote" | "list" | "listitem" | "text" | "escape" | "tag" | "strong" | "link" | "em" | "br" | "codespan" | "image" | "br" | "strikethrough" | "inlinecode" | "lheading" | "reference" | "email";

export default interface Token {
    // 공통 파라미터    
    raw: string;
    text: string;
    type?: TokenType;
    children?: Token[];

    // 옵션 파라미터
    depth?: number;
    href?: string;
    ordered?: boolean;
    orderStart?: number,
    language?: string;
}