import * as fs from "fs";
import * as path from "path";
import { createElement} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parser, renderer, frontmatter, normalize } from "./markdown"
import Blog from "./components/Blog";
import Author from "./Author";
import Token from "./markdown/Token";
import cfg from "./config";

const config = cfg();


const PATH_RE = /^(\d{4})-(\d{2})-(\d{2})-(.*)$/;
const getText = (token: Token) => {
    const texts:string[] =[];
    if (token.type === "text") {
        texts.push(token.text);
    } else {
        
        token.children && token.children.forEach(child => {
            texts.push(...getText(child));
        });
    }
    return texts;
}

export default class Post {
    private title: string;
    private author: Author;
    private path: string[];
    private src: string;
    private compiled: Token;
    private digest: string;
    private timestring: string;
    public sourceDir: string;
    private assets: string[]

    private constructor(sourceDir: string) {
        this.sourceDir = sourceDir;

        const base = path.basename(sourceDir);
        const result = PATH_RE.exec(base);
        if (result === null) {
            throw new Error("invalid path: " + sourceDir);
        }
        
        this.path = [result[1], result[2], result[3], result[4]];
        // index.md 를 제외한 나머지 파일들은 모두 asset 파일이 된다
        this.assets = fs.readdirSync(sourceDir).filter(filename => filename !== "index.md");
        // 해당 파일을 읽는다
        const indexFile = path.join(sourceDir, "index.md");
        
        // 파일의 생성시간을 읽는다
        const stats = fs.statSync(indexFile);
        const filetime = new Date(stats.mtimeMs);
        this.timestring = filetime.toLocaleDateString("default") + `  ${filetime.getHours()}:${filetime.getMinutes()}`

        // 파일내용을 읽는다
        let src = fs.readFileSync(indexFile, "utf-8");
        src = normalize(src);
        
        const fm= frontmatter(src);
        if (fm === null) { throw new Error("need title and author information"); }
        const vars = fm.variables;
        this.title = vars.title;
        this.author = Post.authors![vars.author];
        
        // 프론트매터를 제거한 내용을 기록한다
        this.src = src.substring(fm.raw.length);

        // 마크다운을 읽는다
        const compiled = parser(this.src) ;
        if(compiled === null) { throw new Error("markdown compiled error : " + indexFile); }
        this.compiled = compiled;

        // 컴파일된 결과에서 digest 를 만든다
        // text 항목을 정해진 글자수만큼 합치도록 한다 
        const maxDigest = 200;
        const text = getText(this.compiled).join(" ");
        this.digest = text.substring(0, maxDigest).replace(/\n/g, " ") + "...";
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): Author {
        return this.author;
    }

    getPath(): string[] {
        return this.path;
    }

    getAssets(): string[] {
        return this.assets;
    }

    getDigest(): string {
        return this.digest;
    }

    getTimestring(): string {
        return this.timestring;
    }

    buildHtml(): string {
        // 마크다운텍스트를 파싱해서 트리형태로 변환한다
        const contentDocument = renderer(this.compiled);
        const pageDocument = createElement(Blog, {title: this.title}, contentDocument);
        const html = "<!doctype html>\n" + renderToStaticMarkup(pageDocument);
        return html;
    }

    static authors = Author.loadAll(path.join(config.source));
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
        .filter(filename => PATH_RE.test(filename))
        .forEach(filename => {
            const post = new Post(path.join(postDir, filename));
            posts.push(post);
        });

        return posts;
    }
}