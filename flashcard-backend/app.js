import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './routes/words.js';

const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', (req, res)=>{
    res.status(200).send('Hei, dere!');
});

app.use('/api/v1', router);

app.listen(3000, (err)=>{
    if(err){
        console.log('Error: ', err.message);
    }
    console.log('Server is running on port 3000');
});