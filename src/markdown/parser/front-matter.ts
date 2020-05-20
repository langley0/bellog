// front matter syntax
// ---
// var1-name: context
// var2-name: context
// ---
//
// * front matter 는 파일의 가장 위에 위치해야한다
// front-matter 를 사용하는 것이 확실해지면 그때 다시 작업

import { getLine } from "./utils";

function parseFrontMatter(src: string) {
    const rule = /^\s*(\w+):\s*(.*)\s*\n$/
    const variables: {[key:string]: string } = {};

    // 시작마커와 일치하지 않으면 front matter 를 종료한다
    if (src.slice(0, 4) !== "---\n") {
        return null;
    }

    let pos = 4;
    let line = getLine(src.substring(pos));
    while(line !== null) {
        // frontmatter 종료표시이다
        if (line === "---\n") { 
            pos += line.length;
            break; 
        }

        const regexResult = rule.exec(line);
        if (regexResult === null) { return null; }
        
        const name = regexResult[1];
        const value = regexResult[2];
        variables[name] = value;

        pos += regexResult[0].length;
        line = getLine(src.substring(pos));
    }

    // 결과를 반환한다
    return {
        variables,
        raw: src.substring(0, pos)
    }
}

export default parseFrontMatter;