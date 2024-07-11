
/**
 *  What is stream?
    - It allows the data to be processed in small chunks, provide one piece of data at a time without any need of loading entire conent into the memory.

    Stream uses Zlib:
    - zlib is a library that os is being oftenly used for managing the data efficiently particulary when there is a network commmunication established based file management

    types stream: 4 types of streams:
    1. read: fs.createReadstream(filePath)
    2. write: fs.createWriteStream(filePath)
    3. duplex: websocket
    4. transformative:  change one output into the another output. (crypto, zlib) 

    Streams use the "EventEmitter" base class.

    Pipe(): a method of readable stream and is used to connect with the write stream

    pipe automatically handles the data transfer from readable stream to wriable stream.
    
 */

const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer();

// Implement the solution here

const filePath = path.join(__dirname, 'big.file');
console.log(__dirname);
console.log(filePath);

const fileReadStream = fs.createReadStream(filePath);
const fileWriteStream = fs.createWriteStream('copyOfBig.file');

fileReadStream.on("data", (chunk)=>{
   console.log(`Recieved ${chunk.length} bytes of data`);
   fileWriteStream.write(chunk);
});

fileReadStream.on("end", ()=>{
    fileWriteStream.end();
    console.log('Finished the file content reading and writing')
});

fileReadStream.pipe(fileWriteStream);


server.listen(3080, ()=>{
    console.log('Server is up and running on 3080');
});
