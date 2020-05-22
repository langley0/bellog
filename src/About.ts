import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AboutPage from "./components/About";


export default class About {
    buildHtml() {
        const html = "<!doctype html>\n" + renderToStaticMarkup(createElement(AboutPage));
        return html;
    }
}