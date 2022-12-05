import inquirer from "inquirer";
import readline from 'readline'
import fsp from "fs/promises";
import path from "path";
import colors from 'colors';
import http from "http"
import fs from "fs";


const host = "localhost";
const port = 3000;

const server = http.createServer((request, response) => {
    if (request.method === "GET") {
        const url = request.url.split("?")[0];
        console.log(url);
        const lastPath = path.join(process.cwd(), url);
                fsp
                    .readdir(lastPath)
                    .then( async (textLink) => {
                        const stat = await fsp.stat(path.join(lastPath));
                        if (stat.isFile()) {
                            const text = fsp.readFile(path.join(lastPath), 'utf-8')
                            response.end(text)
                        }
                        else return textLink
                    })
                    .then((list) => {
                        list.forEach((link) => {
                            //console.log()
                            response.write(`<h1><a href=${path.join(link)}>${link}</a></h1>`)
                        })

                    })
            }
})

server.listen(port, host, () =>
console.log(`Server running at http://${host}:${port}`))

//