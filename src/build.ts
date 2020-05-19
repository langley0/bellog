import { createElement} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import MainPage from "./components/MainPage";
import posts from "./pages";
import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import parseMarkdown from "../../mdviewer/src/parser2"
import renderMarkdown from "../../mdviewer/src/viewer"
import Blog from "./components/Blog";


export default function build() {
    // 블로그 메인 페이지는 해당 폴더에 _public/index.html 로 위치한다
    // 여기에 _posts/ 에 있는 데이터들을 날짜별로 모아서 처리하도록 한다
    // 파일은 기본적으로 yyyy-mm-dd-title.md 형태를 하게 된다

    // 페이지 요약정보를 가져온다
    const pages = posts();
    
    // react 객체를 빌드해서 스태틱 파일을 만들어낸다
    const fileContent = "<!doctype html>\n" + renderToStaticMarkup(createElement(MainPage, {pages}));
    writeFileSync(__dirname + "/../_sites/index.html", fileContent, "utf-8");

    pages.forEach(page => {
        // 각각의 페이지도 인스톨한다
        const filename = __dirname + "/../_post/" + page.file;
        const rawtext = readFileSync(filename, "utf-8");
        const root = parseMarkdown(rawtext);
        const contentDocument = createElement(renderMarkdown, { compiled: root?.children || [] });
        const pageDocument = createElement(Blog, null, contentDocument);
        const pageString = "<!doctype html>\n" + renderToStaticMarkup(pageDocument);

        const subDir = `${page.time.getFullYear()}-${page.time.getMonth().toString().padStart(2, "0")}-${page.time.getDate().toString().padStart(2, "0")}`;
        const targetDir = __dirname + `/../_sites/${subDir}/`;
        if (existsSync(targetDir) === false) {
            mkdirSync(targetDir);
        }

        const targetFileName = targetDir + `${page.title}.html`;
        writeFileSync(targetFileName, pageString, "utf-8");;
    });
    
}