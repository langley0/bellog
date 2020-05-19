import build from "./build";
import serve from "./serve";

if (process.argv.length < 3) {
    console.log("Blog Generator  by langley@bel\n");
    console.log("Usage -------------------------------------------");
    console.log("index.ts serve - launch host");
    console.log("index.ts build - generator static web files");
    console.log("-------------------------------------------------");
}

const option = process.argv[2];

if (option === "serve") {
    serve();
} else if (option === "build") {
    build();
}