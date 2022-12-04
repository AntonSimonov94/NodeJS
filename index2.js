import inquirer from "inquirer";
import readline from 'readline'
import fsp from "fs/promises";
import path from "path";
import colors from 'colors';
import http from "http"


const host = "localhost";
const port = 3000;

const server = http.createServer((request, response) => {
    if (request.method === "GET") {
        const url = request.url.split("?")[0];
        const lastPath = path.join(process.cwd(), url);
        response.end('Hello world!')
    }
})

server.listen(port, host, () =>
console.log(`Server running at http://${host}:${port}`))