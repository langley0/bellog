import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Post from "./Post";
import MainPage from "./components/MainPage";


export default class Home {
    buildHtml(posts: Post[]) {
        const html = "<!doctype html>\n" + renderToStaticMarkup(createElement(MainPage, { posts }));
        return html;
    }
}