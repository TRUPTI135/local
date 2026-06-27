const http = require('http');
const fs = require("fs");
const path = require('path');

const port =  3000;
const server = http.createServer((req, res) =>{
    const filepath = path.join(
        __dirname,
        req.url === "/" ? "grid.html" : req.url
    );
    console.log(filepath);

    const extName = String(path.extname(filepath)).toLowerCase();

    const mimeTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js":"text/javascript"
    }

    const contentType = mimeTypes[extName] || 'application/octet-stream'

    fs.readFile(filepath, (err, content) => {
        if(err){
            if(err.code === "ENOENT"){
                res.writeHead(404, { "Content-type": "text/html" });
                res.end("404: File not found brooooo");
            }
        }else{
            res.writeHead(200, {'Content-Type': contentType})
            res.end(content,"utf-8");
        }
    })
});

server.listen(port, ()=>{
    console.log(`Serverr is listning on port ${port}`);

});
// http://localhost:3000/