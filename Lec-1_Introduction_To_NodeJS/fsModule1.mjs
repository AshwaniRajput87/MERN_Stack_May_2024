import fs from 'fs';

 fs.readFile('f1.txt', (err, data)=>{
    if(err) throw err;
    console.log('' + data);
 });