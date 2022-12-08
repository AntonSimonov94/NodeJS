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
let clientID = [];
const io = new Server(server)
io.on('connection', (client) => {
    //clientID.push(client.id)
    //console.log(clientID)
    console.log('Websocket connected')

    client.on('client-msg', (data) => {
        client.broadcast.emit('server-msg', { msg: data.msg })
        client.emit('server-msg', { msg: data.msg })
    })

    client.on('disconnect', (client) => {
        console.log('Websocket disconnection')
    })
})



server.listen(port, host, () =>
    console.log(`Server running at http://${host}:${port}`)
);
