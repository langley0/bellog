
export function getLine(src: string): string {
    let pos = 0;
    while(pos < src.length) {
        const char = src.charAt(pos++);
        if (char === "\n") {
           break; 
        }
    }

    return src.substring(0, pos);
}

export function isEmptyLine(src: string): boolean {
    // 빈칸을 제거한다
    let pos = 0;
    while(pos < src.length) {
        const char = src.charAt(pos++);
        if (char !== " " && char !== "\n" && char !== "\t") {
            return false;
        }
    }

    return true;
}

export function getIndent(src: string): number {
    for(let pos = 0; pos < src.length; pos++) {
        if (src.charAt(pos) !== " ") {
            return pos;
        }
    }
    return src.length;
}

export function isSpace(src: string): boolean {
    const char = src.charAt(0);
    return char === " " ||  char === "\n";
}