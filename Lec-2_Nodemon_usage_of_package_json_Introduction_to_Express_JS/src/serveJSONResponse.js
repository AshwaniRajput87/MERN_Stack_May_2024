import express from 'express';
// create a server
const app = express();

app.get('/api/users', (req, res)=>{
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({
        status: "success",
        message: "Got the get request",
        data: {
            name: 'Ashwani Rajput',
            designation: 'Fullstack developer'
        }
    });
});

app.post('/api/users', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        status: "success",
        message: "Got the post data"
    })
});

app.put('/api/users', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        status: "success",
        message: "Got the put data"
    })
});

app.delete('/api/users', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        status: "success",
        message: "Got the delete data"
    })
});

app.use((req, res)=> {
    res.status(404).json({
        status: "failure",
        message: "not found"
    })
})




app.listen(3000, 'localhost', ()=>{
    console.log('Express server is up and running on 3000')
});

