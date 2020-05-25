import express from "express";
import cfg from "./config";

const config = cfg();

export default function serve() {
    const app = express();
    app.use(express.static(config.destination, { etag: false }));
    app.listen(4000, () => {
        console.log("dev server listen at port 4000");
    });
}