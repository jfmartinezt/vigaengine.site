<template>
  <div>
    <h1>pixel-room.chat</h1>
    <v-nickname></v-nickname>
  </div>
</template>
<script>
import Nickname from '../commons/Nickname.vue'

export default {
  name: 'Join',
  components:{
    'v-nickname': Nickname
  }
}
</script>
