import * as fs from "fs";
import * as path from "path";
import { createElement} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Post from "./Post";
import AuthorPage from "./components/AuthorPage";

interface Authors {
    [key: string]: Author
}

export default class Author {
    private name :string;
    private id: string;
    private email: string;

    constructor(json: any) {
        this.name = json.name;
        this.id = json.id;
        this.email = json.email;

    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    static loadAll(dir: string): Authors | null  {
        // 해당 디렉토리를 기준으로 _authors 폴더를찾아서 author 데이터를 로드한다
        const authorDir = path.join(dir, "_authors");
        if (fs.existsSync(authorDir) === false) {
            return null;
        }

        const authros: Authors = {};

        fs.readdirSync(authorDir)
        .filter(filename => path.extname(filename) === ".json")
        .forEach(filename => {
            const rawText = fs.readFileSync(path.join(authorDir, filename), "utf-8");
            const authorJson = JSON.parse(rawText);
            const idFromFile = filename.substring(0, filename.length - 5);
            authorJson.id = idFromFile;
            authros[idFromFile] = new Author(authorJson);;
        });

        return authros;
    }

    // 일단 여기에 만들고 나중에 옮기자...
    // 프로토타입에서는 위치에 대해서 일단 신경쓰지말자..
    static buildHtml(author: Author, posts: Post[]) {
        const pageDocument = createElement(AuthorPage, {name: author.getName(), email: "test@test", posts: posts });
        const html = "<!doctype html>\n" + renderToStaticMarkup(pageDocument);
        return html;
    }
}