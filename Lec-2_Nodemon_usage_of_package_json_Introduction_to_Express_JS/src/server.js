// const http = require('http');
// const path = require('path');
// const fs = require('fs');

import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// create a server

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const server = http.createServer((req, res)=> {
   res.setHeader('Content-Type', 'text/html');

   if(req.url === '/' || req.url === 'index.html') {

    fs.readFile(path.join(__dirname, 'public', 'html', 'demo.html'), 'utf-8', (err, data)=>{
        if(err) {
            console.log('Error handling', err);
            res.statusCode = 500;
            res.end('Internal Server Error.');
        } else {
            res.write(data);
            res.end();
        }
    })
   } else if(req.url === '/css/style.css') {
    res.setHeader('Content-Type', 'text/css');
    fs.readFile(path.join(__dirname, 'public', 'css', 'style.css'), 'utf-8', (err, data)=>{
        if(err) {
            console.log('Error handling', err);
            res.statusCode = 500;
            res.end('Internal Server Error.');
        } else {
            res.write(data);
            res.end();
        }
    })
   } else {
     res.statusCode = 404;
     res.end('Not Found');
   }
});


// the server has to listen on port so that the url can be accessed to et the results
const port = 3000;
const hostname = 'localhost';
server.listen(port, hostname, ()=>{
    console.log(`server is up and running on http://${hostname}:${port}`);
})
