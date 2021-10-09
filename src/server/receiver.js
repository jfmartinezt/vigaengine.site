
const io = require("socket.io")(3001);

// creating a client socket
var udp = require("dgram");
var client = udp.createSocket("udp4");
var clients = [];
var clients_out = [];
const udpServerIP = 5501;
setInterval(syncServer, 40);

io.on("connection", socket => {
  if (!clients[socket.handshake.auth.token]) {
    console.log("user: " + socket.handshake.auth.token + " connected");
    clients[socket.handshake.auth.token] = {
      client:{
        uuid: socket.handshake.auth.token
      },
    };

    clients_out[socket.handshake.auth.token] = {
      client:{
        uuid: socket.handshake.auth.token
      },
    };
  }

  socket.on("join", data => {
    console.log("server join request user: " + data.client.uuid);
    client.send(
      JSON.stringify(data),
      udpServerIP,
      "localhost",
      function(error) {}
    );
  });
  socket.on("join-sync", data => {
    console.log("node join-sync request user: " + data.client.uuid);
    io.to(socket.id).emit("join-sync", clients_out[socket.handshake.auth.token]);
  });

  socket.on("message", data => {
    var json = JSON.stringify(data);
    client.send(json, udpServerIP, "localhost", function(error) {});
  });
  socket.on("control", data => {
    var json = JSON.stringify(data);
    client.send(json, udpServerIP, "localhost", function(error) {});
  });
  socket.on("data", data => {
    clients[data.client.uuid] = data;
    io.to(socket.id).emit("data", clients_out[socket.handshake.auth.token]);

  });

});



function syncServer() {
  for (const [key, value] of Object.entries(clients)){
    client.send(JSON.stringify(value), udpServerIP, "localhost", function(error) {});
  };
}

client.on("message", function(msg, info) {
  var data = JSON.parse(msg);
  clients_out[data.client.uuid] = data;
});
