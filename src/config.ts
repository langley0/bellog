import * as fs from "fs";
import * as path from "path";

export interface Config {
    source: string;
    destination: string;
}

const cwd = process.cwd();

export default function (): Config {
    // config 파일을 로딩한다
    const filename = "config.json"
    // json 파일을 로딩한다
    if (fs.existsSync(filename)) {
        const configStr = fs.readFileSync(filename, "utf-8");
        const configJson = JSON.parse(configStr);
        return {
            source: path.join(cwd, configJson["source"] || "."),
            destination: path.join(cwd, configJson["destination"] || "./_post"),
        }
    } else {
        // 기본값을 반환한다
        return {
            "source": cwd,
            "destination": path.join(cwd, "./_post"),
        };
    }
}