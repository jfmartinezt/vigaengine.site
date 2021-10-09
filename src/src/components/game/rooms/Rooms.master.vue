<template>
  <div>
    <div class="container">
      <div class="row">
        <h2>Room selection</h2>
      </div>

      <div class="row justify-content-md-center">
        <div class="col-6 col-md-4"></div>
        <div class="col-6 col-md-4">
          <table class="table table-hover table-bordered">
            <caption>
              List of rooms
            </caption>
            <thead class="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Language</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(room, index) in rooms" :key="index">
                <td>{{ index }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'rooms.detail',
                      params: {
                        id: room.id,
                        nickname: nickname,
                        uuid: uuid
                      },
                    }"
                  >
                    {{ room.id }}
                  </router-link>
                </td>
                <td>
                  <label> {{ room.name }} </label>
                </td>
                <td>
                  <label> {{ room.lang }} </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-6 col-md-4"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Rooms",

  watch: {
    $route: {
      handler: function (to, from) {
        console.log("room master");
        this.nickname = to.params.nickname;
        this.uuid = to.params.uuid;
      },
      immediate: true,
    },
  },
  data() {
    return {
      rooms: [],
      nickname: "",
      uuid: "",
    };
  },
  mounted() {
    console.log("mounted");

    this.init();
  },

  created() {
    console.log(this.nickname);
  },
  methods: {
    init() {
      console.log("init");

      this.configure();
    },

    configure() {
      console.log("configure");

      this.rooms = [];
      this.rooms = this.fetchRooms();
    },

    fetchRooms() {
      return [
        {
          id: 1332,
          name: "room abc",
          lang: "EN",
        },
        {
          id: 21123,
          name: "room bcde",
          lang: "ES",
        },
      ];
    },
  },
};
</script>
