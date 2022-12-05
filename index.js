import fsp from "fs/promises";
import path from "path";
import http from "http"
import fs from "fs";

const host = "localhost";
const port = 3000;

const server = http.createServer((request, response) => {
    if (request.method === "GET") {
        const url = request.url.split("?")[0];
        const lastPath = path.join(process.cwd(), url);

        fs.stat(lastPath, (error, stats) => {
            if (error) {
                console.log(error)
            } else {
                if (stats.isDirectory(lastPath)) {
                    fsp
                        .readdir(lastPath)
                        .then((list) => {
                            list.forEach((link) => {
                                response.write(`<h1><a href=${path.join(url, link)}>${link}</a></h1>`, 'utf-8')
                            })
                            response.end()
                        })
                } else {
                    const readStream = fs.createReadStream(lastPath);
                    readStream.pipe(response)
                }
            }
        })
    }
})

server.listen(port, host, () =>
    console.log(`Server running at http://${host}:${port}`))