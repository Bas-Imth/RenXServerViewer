const http = require("http");
const fs = require("fs");
var renxdata;

// Loading the index file . html displayed to the client
var server = http.createServer(function (req, res) {
    if(req.url == '/'){
        fs.readFile("./index.html", function (err, data) {
        if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        })
    }
    else if(req.url == '/style.css'){
        res.setHeader('Content-type', 'text/css');
        res.write(fs.readFileSync('./style.css'));
        res.end();
    }
    else if(req.url == '/script.js'){
        res.setHeader('Content-type', 'text/javascript');
        res.write(fs.readFileSync('./script.js'));
        res.end();
    } 
    else {
        res.write("invalid request")
        res.end();
    }
});

function fetchData() {
    const https = require("http");
    const options = {
        hostname: "brotherhoodofnod.net",
        port: 8080,
        path: "/api/server/?Game%20Version=latest",
        method: "GET",
    };

    var data = "";

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on("data", (d) => {
            data += d;
        });

        res.on("end", () => {
            data = JSON.parse(data);

            fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
        });
    });

    req.on("error", (error) => {
        console.error(error);
    });

    req.end();
}

fetchData();
setInterval(fetchData, 15000);
setInterval(broadcastToSocket, 5000);

// Loading socket.io
const io = require("socket.io")(server, { cors: { origin: "*"} });
// When a client connects, we note it in the console
io.sockets.on("connection", function (socket) {
    console.log("Incoming: " + socket.handshake.address);
    socket.emit("message", "You are connected!");
    renxdata = JSON.parse(fs.readFileSync("data.json", "utf8"));
    io.local.emit("renxData", renxdata);
});

function broadcastToSocket() {
    renxdata = JSON.parse(fs.readFileSync("data.json", "utf8"));
    io.local.emit("renxData", renxdata);
}

var nstatic = require("node-static");

var file = new nstatic.Server(__dirname);

http.createServer(function (req, res) {
    file.serve(req, res);
}).listen(8081);

server.listen(80);
