// Italic
// *This text is italic*
// _This text is italic_

import Token from "../../Token";

export default function italic(src: string): Token | null {
    let pos = 0;
    const marker = src.charAt(pos++);

    if (marker !== "_" && marker !== "*") { return null; }
    
    // em 은 _ 혹은 * 로 감싸여진 문장을 지원한다
    //   __  혹은 ** 은 처리하지 않는다
    if (src.charAt(pos++) === marker) { return null; }

    // 계속 스캐을 하면서 ** 혹은 __ 이 나올때까지 진행을 한다
    while(pos < src.length) {
        if (src.charAt(pos++) === marker &&
            src.charAt(pos++) !== marker) {
            // 종료 문장을 찾았다
            return {
                type: "em",
                raw: src.substring(0, pos-1),
                text: src.substring(1, pos-2),
            }
        }
    }

    // 끝까지 스캔했지만 종료문장을 찾을 수 없다면 이것은 strong 이 아니다
    return null;
}