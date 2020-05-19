import express from "express";

export default function serve() {
    const path = __dirname + "/../_sites";

    const app = express();
    app.use(express.static(path, { etag: false }));
    app.listen(4000, () => {
        console.log("dev server listen at port 4000");
    });
}