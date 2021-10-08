import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import https from 'https';
import webhookAG from './middlewares/webhook-ag';
import webhookDF from './middlewares/webhook-df';
import dialogflow from './middlewares/dialogflow';
import pack from '../package.json';

const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));
app.get('/', (req, res) => {
  res.send(`Сервис для интеграции 1C и Dialogflow CX. Версия ${pack.version}.`);
});
app.post('/webhook-ag', webhookAG());
app.post('/webhook-df', webhookDF());
app.post('/dialogflow', dialogflow());

const options = {
  key: fs.readFileSync('/certs/key.pem'),
  cert: fs.readFileSync('/certs/cert.pem'),
};
https.createServer(options, app).listen(process.env.PORT || 3000);
