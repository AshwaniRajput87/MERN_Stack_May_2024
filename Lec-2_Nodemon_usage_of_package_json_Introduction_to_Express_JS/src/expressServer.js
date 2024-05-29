import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// create a server

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res)=>{
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(path.join(__dirname, 'public', 'html', 'demo.html'));
});

app.use((req, res, next)=>{
    
    res.status(404).send('Not Found');
});

app.listen(3000, 'localhost', ()=>{
    console.log('Express server is up and running on 3000')
});

