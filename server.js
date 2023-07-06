const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 8080;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

app.use(express.static('public'));

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

server.listen(port, function() {
  console.log(`Сервер запущен на ${port} порте!`)
})