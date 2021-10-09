
const io = require("socket.io")(3000);

// creating a client socket
var udp = require("dgram");
var client = udp.createSocket("udp4");
var sockets = [];

const clients = new Map();
const clients_out = new Map();
const clients_join_req = new Map();
const clients_join_res = new Map();

const udpServerIP = 5501;
setInterval(syncServer, 5);

io.on("connection", socket => {
  if (!clients[socket.handshake.auth.token]) {
    console.log("user: " + socket.handshake.auth.token + " connected");

    sockets[socket.handshake.auth.token] = socket.id;

    clients_join_req[socket.handshake.auth.token] = {
      client:{
        uuid: socket.handshake.auth.token
      },
    };

    clients_join_res[socket.handshake.auth.token] = {
      client:{
        uuid: socket.handshake.auth.token
      },
    };
  }

  socket.on("join", data => {
    console.log("server join request user: " + data.client.uuid);
    let arr = [];
    arr.push(data);

    client.send(
      JSON.stringify(arr),
      udpServerIP,
      "localhost",
      function(error) {}
    );
  });
  socket.on("join-sync", data => {
    console.log("node join-sync request user: " + data.client.uuid);
    io.to(socket.id).emit("join-sync", clients_join_res[socket.handshake.auth.token]);
  });

  socket.on("data", data => {
    clients.delete(data.client.uuid);
    clients[data.client.uuid] = data;

    io.to(socket.id).emit("data", clients_out[data.client.uuid]);
  });
});

function syncServer() {
  client.send(bulk(), udpServerIP, "localhost", function(error) {});
}

client.on("message", function(msg, info) {
  var clients_data = JSON.parse(msg);
  clients_data.forEach(data => {
    if(data.type == 2){
      console.log("server joined response");

      clients[data.client.uuid] = data;
      clients_out[data.client.uuid] = data;
      clients_join_res[data.client.uuid] = data;
    }
    clients_out.delete(data.client.uuid);
    clients_out[data.client.uuid] = data;
  });
});


function bulk() {
  const t = [];
  for(var key in clients){ t.push(clients[key]); }
  return JSON.stringify(t);
}
