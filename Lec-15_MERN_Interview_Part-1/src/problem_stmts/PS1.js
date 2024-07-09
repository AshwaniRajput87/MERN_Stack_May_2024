/* 

  PS:1 How can a Node.js application effectively serve large files, such as a 400MB video or text file for eg, without exhausting the server's RAM and cache resources?

  solution: Streaming -> will break the content into chunks.

*/

const fs = require('fs');

const content = Math.random().toString(36).repeat(10000000);


fs.writeFileSync('/Users/ashwanirajput/Documents/Projects/MERN_Stack_May_2024/Lec-15_MERN_Interview_Part-1/src/big.file', content);


