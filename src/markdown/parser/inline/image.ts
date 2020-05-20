// 이미지는 다음 두가지 형태를 가진다
// ![label](link) 
// ![label](link "title")

// 위의 두가지 형태는 ! 뒤에 완전히 link 와 동일하다

import Token from "../../Token";
import link from "./link";

export default function(src: string): Token | null {

    if (src.charAt(0) === "!") {
        const token = link(src.substring(1));
        if (token !== null) {
            return {
                type:"image",
                raw: src.substring(0, 1 + token.raw.length),
                text: token.text,
                href: token.href,
            };
        }
    }
    return null;
}