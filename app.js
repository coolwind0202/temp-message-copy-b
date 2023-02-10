import fetch from "node-fetch";
import express from "express";

import path from 'path';
import { fileURLToPath } from 'url';

import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

const getEndpoint = (channelId, option) => {
  return `https://discord.com/api/v9/channels/${channelId}/messages?${new URLSearchParams(option).toString()}`;
}

const fetchMessages = async (token, channelId) => {
  const endpoint = getEndpoint(channelId, { limit: 5 });
  console.log(endpoint);

  const headers = { "Authorization": `Bot ${token}` };
  const result = await fetch(endpoint, { headers });
  const json = await result.json();
  return json;
}

app.get("/", (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  res.sendFile(`${__dirname }/index.html`);
});

app.post("/fetch/", (req, res) => {
  console.log("/fetch");

  fetchMessages(req.body.token, req.body.channelId)
    .then(messages => {
      res.send(messages);
    })
    .catch(e => console.error(e));
});

app.listen(3000, () => console.log('http://localhost:3000'))