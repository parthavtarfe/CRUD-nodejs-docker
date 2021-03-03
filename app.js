const model = require('./functions/lib/controller'); 
var app = model.app;
const http = require('http');

const port = 3000;


let server = http.createServer(app);

server.listen(port, () => {
  console.log("Listening to port : ", port);
});

server.on('error', (error)=>{
  console.log(error);
});

