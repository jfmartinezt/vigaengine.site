<template>
  <div class="container">
    <form @submit.prevent="join()">
      <div class="row justify-content-md-center">
        <div class="col-sm"></div>
        <div class="col-sm">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Nickname"
              aria-label="Nickname"
              v-model="nickname"
              required
            />
          </div>
        </div>
        <div class="col-sm"></div>
      </div>

      <v-lbutton
        type="submit"
        :loading="joining"
        :name="'Join'"
      >
      </v-lbutton>
    </form>
  </div>
</template>

<script>
import LButton from "../utility/LButton.vue";
import {v4 as uuidv4} from 'uuid';

export default {
  name: "Nickname",
  components: {
    "v-lbutton": LButton,
  },

  data() {
    return {
      nickname: '',
      joining: false,
    };
  },

  methods: {
    join() {
      let _this = this;
      let myuuid = uuidv4();

      _this.joining = true;

      setTimeout(() => {
        console.log("loading finished");
        _this.joining = false;
        this.$router.push({name: 'rooms.master', params: {nickname: this.nickname, uuid: myuuid}});
        });

    },
  },
};
</script>
