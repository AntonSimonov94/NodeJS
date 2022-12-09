import http from "http";
import fs from "fs";
import path from "path";
import {Server} from "socket.io";


const host = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    if (["GET", "POST", "PUT"].includes(req.method)) {

        const filePath = path.join(process.cwd(), "./index.html");
        const rs = fs.createReadStream(filePath);

        rs.pipe(res);
    }
});

const io = new Server(server)
let count = 0;
io.on('connection', (client) => {

    count += 1;
    let userName = (Math.random() + 1).toString(36).substring(7);

    client.broadcast.emit('server-new-client', {msg: 'connected ', clientName: userName})
    client.broadcast.emit('count-client', {changeCount: count})
    client.emit('count-client', {changeCount: count})

    client.on('client-msg', (data) => {
       // console.log(userName)
        client.broadcast.emit('server-msg', {msg: data.msg, clientName: userName})
        client.emit('server-msg', {msg: data.msg, clientName: userName})
    })

    client.on('disconnect', () => {
        count -= 1;
        client.broadcast.emit('server-dis-client', {msg: 'disconnected ', clientName: userName})
        client.broadcast.emit('count-client', {changeCount: count})
    })
})

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);

});
