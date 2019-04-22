const http = require('http');
const app = require('./app');
const server = http.createServer(app);

//Serververbindung aufbauen
server.listen(1207);




