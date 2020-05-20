import * as fs from "fs";
import * as path from "path";
import { createElement} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parser, renderer, frontmatter, normalize } from "./markdown"
import Blog from "./components/Blog";
import Author from "./Author";
import Token from "./markdown/Token";

export default class Post {
    private title: string;
    private author: Author;
    private path: string;
    private src: string;
    private postname: string;
    private target: string[];
    private compiled: Token;
    private digest: string;

    private constructor(_path: string, src: string) {
        src = normalize(src);
        const result = frontmatter(src);
        if (result === null) { throw new Error("need title and author information"); }
        const vars = result.variables;
        
        // frontmatter 를 제거한 값을 원본으로 사용한다
        this.src = src.substring(result.raw.length);
        this.title = vars.title;
        this.author = Post.authors![vars.author];
        this.path = _path;

        const baseName = path.basename(_path);
        const rule = /^(\d{4})-(\d{2})-(\d{2})-(.*).md$/;
        const regResult = rule.exec(baseName);
        if (regResult === null) { throw new Error("invalid file name: " + baseName) }
        this.postname = regResult[4];
        this.target = [regResult[1], regResult[2], regResult[3]];
        
        const compiled = parser(this.src) ;
        if(compiled === null) { throw new Error("markdown compiled error : " + _path); }
        this.compiled = compiled;

        // 컴파일된 결과에서 digest 를 만든다
        // text 항목을 정해진 글자수만큼 합치도록 한다 
        const maxDigest = 200;
        const getText = (token: Token) => {
            const texts:string[] =[];
            if (token.type === "text") {
                texts.push(token.text);
            } else {
                
                token.children?.forEach(child => {
                    texts.push(...getText(child));
                });
            }
            return texts;
        }
        const text = getText(this.compiled).join(" ");
        this.digest = text.substring(0, maxDigest).replace(/\n/g, " ") + "...";
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): Author {
        return this.author;
    }

    getName(): string {
        return this.postname;
    }

    getTargets(): string[] {
        return this.target;
    }

    getDigest(): string {
        return this.digest;
    }

    buildHtml(): string {
        // 마크다운텍스트를 파싱해서 트리형태로 변환한다
        const contentDocument = renderer(this.compiled);
        const pageDocument = createElement(Blog, {title: this.title}, contentDocument);
        const html = "<!doctype html>\n" + renderToStaticMarkup(pageDocument);
        return html;
    }

    static authors = Author.loadAll(__dirname + "/..");
    static loadAll(dir: string): Post[] | null {

        // 주어진 폴더위치를 기준으로 post 폴더를 찾아서 로딩한다
        // parsing 과 render 를 할수있도록 준비하자
        // @todo 이미 진행된 파일을 스킵하는 기능을 추가한다
        const postDir = path.join(dir, "_post");
        if (fs.existsSync(postDir) === false) {
            return null;
        }

        const posts: Post[] = [];

        fs.readdirSync(postDir)
        .filter(filename => path.extname(filename) === ".md")
        .forEach(filename => {
            const rawText = fs.readFileSync(path.join(postDir, filename), "utf-8");
            const post = new Post(path.join(postDir, filename), rawText);
            posts.push(post);
        });

        return posts;
    }
}