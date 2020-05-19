import * as fs from "fs";

interface PageInfo {
    title: string;
    author: string;
    digest: string;
    image: string;
    time: Date;
    file: string;
}

function getPageInfo(file: string): PageInfo | null {
    const rule = /^(\d{4})-(\d{2})-(\d{2})-(.*).md$/;
    const result = rule.exec(file);
    if(result !== null) {
        const year = Number(result[1]);
        const month = Number(result[2]);
        const day = Number(result[3]);
        const title = result[4];
        return {
            title: title,
            author: "test",
            digest: "content",
            image: "",
            time: new Date(year, month, day),
            file: file
        }
    }
    return null;
}


// post 들의 목록을 가져온다
export default function() {
    const dir = "./_post";
    const result: PageInfo[] = [];

    // 해당 폴더내의 파일목록을 가져온다
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        // 각각의 파일을 파싱해서 page 파일을 만든다.
        // page 파일의 목록을 시간순으로 해서 가장 최신의 파일을 위로 올린다
        // 마지막에 new 를 붙이는 것은 천천히 고민해보자

        // 일단 파일제목해서 title 을 뽑아낸다. auth 와 content 는 임시로 제작
        const info = getPageInfo(file);
        if (info !== null) {
            result.push(info);
        }
    });

    return result;
}