/**
   What is child process?

    - In nodeJS child process allows you to perform operations in a separate processes, which can be useful for the CPU intenstive task.

    - with child process, 4 things can be done:
    1. exec: run any shell commands without communication.
    2. execFile:  you can run any compiled files (likewise .exe file)
    3. spawn
    4. fork: light weight to create a process (CPU intensive task)

 */

const express = require('express');
const cors = require('cors');
 const path = require('path');

const app = express();

app.use(cors());



const { fork } = require('node:child_process');


app.get('/fib', (req, res)=>{

  const {number , requestNumber}  = req.query;

  if(!number || isNaN(number) || number <=0) {
    return res.status(400).json({
      error: 'Please provide a positive number'
    })
  }

  const fibRes = fork(path.join(__dirname, 'fibWorker.js'));

  fibRes.send({number: parseInt(number)});

    fibRes.on('message', (ans)=>{
        res.status(200).json({
            status: "success",
            message: ans,
            requestNumber
        })
    })
});

app.listen(3000, ()=>{
  console.log('Server is up and running on 3000');
})