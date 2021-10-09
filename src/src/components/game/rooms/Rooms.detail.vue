<template>
  <div>
    <h1>Room detail</h1>
    <canvas
      id="canvas"
      width="720"
      height="480"
      style="border: 1px solid #000000"
    >
    </canvas>
    <!-- <div v-if="joined">
      <div class="row-fluid">
        <ul>
          <li v-for="(message, index) in data.room.messages" :key="index">
            {{ message }}
          </li>
        </ul>

        <label for="inText">text</label>
        <input type="text" name="" id="inText" v-model="message" />
        <button @click.prevent="sendMessage">send</button>
      </div>
    </div> -->

    <div v-for="(client, index) in data.room.public.clients" :key="index">
      <label for="">{{client.form.x}}, {{client.form.x - oldClients[index]}}</label>
    </div>
  </div>
</template>
<script>
export default {
  name: "rooms.detail",
  watch: {
    $route: {
      handler: function (to, from) {
        this.id = to.params.id;
        this.nickname = to.params.nickname;
        this.uuid = to.params.uuid;
      },
      immediate: true,
    },
  },

  data() {
    return {
      canvas: {},
      nickname: "",
      uuid: "",
      message: "",
      socket: {},
      joined: false,
      n: 0,
      sprites: [],
      data: {
        client: {
          mask: {
            sprites: {},
          },
          controls: {
            keys: {},
          },
          form: {
            keys: {},
          },
        },

        room: {
          messages: [],
          public: {
            clients: [],
          },
        },
      },
      oldClients: [],
      vueCanvas: {},
      keys: {},
      map: {},
      responseData: {},
      responseJoin: {},
      dataRequest: {},
      animationLoop: {},
      start: null,
      lasTimeStamp: 0,
      framesPerSecond: 65,
      timeStep: 1000 / this.framesPerSecond,
      loadingSprites: false,

      pingLoop: {},
      dataLoop: {},

      lastTime: {},
      lastX: 0,
      pressed: false,
    };
  },
  created() {
    console.log(this.nickname);
  },

  mounted() {
    document.onkeydown = this.keyLog;
    document.onkeyup = this.keyLog;
    this.canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    this.vueCanvas = ctx;

    this.iniData();
    this.iniConnection();
  },

  methods: {
    iniData() {
      this.data.client.uuid = this.uuid;
      this.data.room.uuid = "12345";
    },

    iniConnection() {
      console.log("uuid: " + this.uuid);
      this.socket = new WebSocket("ws://127.0.0.1:5501");

      this.socket.onopen = (data) => {
        console.log("connected");

        this.requestJoin();
      };

      this.socket.onmessage = (message) => {
        let data = JSON.parse(message.data);
        if (data.type == 2) {
          this.joined = true;
          console.log("joined");

          this.startData();
          this.animate();

          this.oldClients = this.data.room.public.clients;
          this.lastX = this.data.room.public.clients[0].form.x;
        }

        if (data.type == 4) {
          this.data.room.public = data.room.public;

          if(this.lastX != data.room.public.clients[0].form.x){
            var currentTime = Date.now();
            console.log('ms:' + (currentTime - this.lastTime));


          }

            this.lastTime = currentTime;
            this.lastX = data.room.public.clients[0].form.x;
        }
      };
    },

    requestJoin() {
      this.data.type = 1;
      this.socket.send(JSON.stringify(this.data));
      console.log("join request sent.");
    },

    sendData() {
      this.socket.send(JSON.stringify(this.data));
    },

    startData() {
      this.data.type = 4;
      this.data.client.control = {
        keys: this.map,
      };
      this.dataLoop = setInterval(this.sendData, 10);
    },

    endData() {
      clearInterval(this.dataLoop);
    },

    animate(timestamp) {
      if (!this.start) this.start = timestamp;
      var progress = timestamp - this.start;
      this.paint(progress);

      this.start = timestamp;
      window.requestAnimationFrame(this.animate);
    },

    paint(progress) {
      this.clearCanvas();
      this.vueCanvas.fillStyle = "blue";

      this.data.room.public.clients.forEach((client) => {
        this.vueCanvas.fillRect(
          client.form.x,
          client.form.y,
          client.form.width,
          client.form.height
        );
      });
    },

    clearCanvas() {
      this.vueCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    keyLog(e) {
      //console.log("keypressed");
      e = e || event; // to deal with IE
      this.map[e.keyCode] = e.type == "keydown";
      this.lastTime = Date.now();
      this.pressed = true;
      /* insert conditional here */

      //console.log(this.map);
    },

    // loadSprites(nsprites) {
    //   for (const [key, value] of Object.entries(nsprites)) {
    //     var img = new Image();
    //     img.src = value.url;
    //     this.sprites[key] = img;
    //   }

    //   console.log(nsprites);
    //   console.log(this.sprites);
    // },
  },
};
</script>
