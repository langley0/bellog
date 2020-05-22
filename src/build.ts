import { writeFileSync, mkdirSync, existsSync, copyFileSync } from "fs";
import * as path from "path";
import Post from "./Post";
import Home from "./Home";
import Author from "./Author";
import About from "./About";
import cfg from "./config";

const config = cfg();

function makedir(targetDir: string) {
    if (existsSync(targetDir) === false) {
        mkdirSync(targetDir);
    }
}

function buildHome(posts: Post[]) {
    // react 객체를 빌드해서 스태틱 파일을 만들어낸다
    const home = new Home();
    const html = home.buildHtml(posts);

    const targetFile = path.join(config.destination, "index.html");
    writeFileSync(targetFile, html, "utf-8");
}

function buildAuthor(posts: Post[]) {
    // 각각의 작가페이지를 작성한다
    // 작가 페이지는 간단한 프로필과 작성한 글 목록을 보여준다

    // 같은 작가로 정렬한다
    const sorted: { [name: string]: { author: Author, posts: Post[] }} = {};
    posts.forEach(post => {
        const authorName = post.getAuthor().getName();
        if (sorted[authorName] !== undefined) {
            sorted[authorName].posts.push(post);
        } 
        else {
            sorted[authorName] = {
                author: post.getAuthor(),
                posts: [post]
            };
        }
    });

    Object.keys(sorted).forEach(key => {
        const { author, posts}  = sorted[key];
        const html = Author.buildHtml(author, posts);
        
        let targetDir = path.join(config.destination, "authors");
        makedir(targetDir);
        const targetFileName = path.join(targetDir, `${author.getId()}.html`);
        writeFileSync(targetFileName, html, "utf-8");;
    });
}

function buildPost(post: Post) {
    // 각각의 post 에 대해서 처리를 한다
    const html = post.buildHtml();
    let targetDir = path.join(config.destination);
    post.getPath().forEach(dir => {
        targetDir = path.join(targetDir, dir);
        makedir(targetDir);
    })

    const targetFileName = path.join(targetDir, "index.html");
    writeFileSync(targetFileName, html, "utf-8");;

    // 어셋 파일을 복사한다
    post.getAssets().forEach(filename => {
        const src = path.join(post.sourceDir, filename);
        const dst = path.join(targetDir,filename);
        copyFileSync(src, dst);
    });
}

function buildAbout() {
    // react 객체를 빌드해서 스태틱 파일을 만들어낸다
    const about = new About();
    const html = about.buildHtml();

    let targetFile = path.join(config.destination, "about.html");
    writeFileSync(targetFile, html, "utf-8");
}

export default function build() {
    const posts = Post.loadAll(path.join(config.source));
    if (posts === null) { return; }
    
    // 각각의 포스트를 작성한다
    posts.forEach(post => {
        buildPost(post);
    });

    // 메인페이지를 작성한다
    // 간단한 내용요약을 만들어야 한다. 어떻게??
    buildHome(posts);

    // 작가페이지를 작성한다
    buildAuthor(posts);

    // about 페이지를 작성한다
    buildAbout();
}