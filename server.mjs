import express from 'express';
import path from 'path'
const __dirname = path.resolve();

import apiRouter from './api/index.mjs';




const app = express();
app.use(express.json());


app.use('/api', apiRouter);


app.use(express.static(path.join(__dirname, 'public')))


const PORT = process.env.Port || 3000

app.listen(PORT, () => {
    console.log(`posting app listening on ${PORT} `)
})


