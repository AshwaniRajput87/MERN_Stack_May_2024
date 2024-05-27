/**
   fs module: helps to interact with files to perform read/write operations inside the file.
 */

 const fs = require('fs');
 const str = '';

 fs.readFile('f1.txt', (err, data)=>{
    if(err) throw err;
    console.log('' + data);
 });

 const content = 'Hello, Abhijeet. How are you?';

 fs.writeFile('f2.txt', content, (err)=>{
    if(err) {
        console.log(err);
        return;
    }

    console.log('Data has been updated successfullly');
 })

 const encrypt = (data) =>{


    // processing the data and encrypt;

    //return the encrypted data;

 }

 export {encrypt}; //.mjs

 module.exports = {encrypt}; //.js

 /**
    1. write the content inside the existing file(f1.txt) without overriding the content.
    2. copying the content of file into another file
 */

