/**

   http module: helps you to create the http server and serve (plain text, html, json response) the request and response from the server.

 */

 const http = require('http');

 const httpServer = http.createServer((req, res)=> {
    res.setHeader('Content-type', 'text/plain');
    // const jsonRes = {
    //     name: 'Ashwani Rajput',
    //     Designation: 'VP of Softare Engineering'
    // }
    res.write('Hello Pavan, Welcome in the HTTP module of NodeJS!!');
    res.end();
 });

 const hostname = 'localhost';
 const port = 8090;

 httpServer.listen(port, hostname, ()=>{
    console.log(`Server is up and running on http://${hostname}:${port}`);
 });

 /**
    Try out to send the json response at the client side
  */