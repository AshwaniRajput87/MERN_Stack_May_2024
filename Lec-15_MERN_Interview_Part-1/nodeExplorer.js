/*
  lets talk about node in depth
*/

/*
  What is process?

    - It's a global object that provides you the information and control over the current nodeJS process.

    - It is used one of the core modules and can be used without importing.

*/

const dotenv = require('dotenv');

dotenv.config();

// console.log(process.env);

const { PORT, SECRET_KEY} = process.env;

console.log(PORT, SECRET_KEY);

console.log(process.cwd());

console.log(process.pid);

console.log(process.stdout);