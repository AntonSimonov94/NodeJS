import http from "http";

import fs from "fs";
import path from "path";
import { Server } from "socket.io";


const host = "localhost";
const port = 3000;


const server = http.createServer((req, res) => {
    if (["GET", "POST", "PUT"].includes(req.method)) {

        const filePath = path.join(process.cwd(), "./index.html");
        const rs = fs.createReadStream(filePath);

        rs.pipe(res);
    }
});

let name = (Math.random() + 1).toString(36).substring(7);
console.log("random", name);


const io = new Server(server)
io.on('connection', (client) => {
    let userName = (Math.random() + 1).toString(36).substring(7);

    client.broadcast.emit( 'server-new-client', {msg: 'Connected ', clientName : userName})

    client.on('client-msg', (data) => {
        console.log(userName)
        client.broadcast.emit('server-msg', {msg: data.msg, clientName: userName })
        client.emit('server-msg', {msg: data.msg, clientName: userName })
    })

    client.on('disconnect', () => {
        client.broadcast.emit( 'server-dis-client', {msg: 'Disonnected ', clientName : userName})
    })
})



server.listen(port, host, () =>
    console.log(`Server running at http://${host}:${port}`)
);
