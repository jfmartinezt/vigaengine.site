<template>
    <div v-if="loading" class="spinner-border text-dark" role="status"></div>

    <button v-else type="button" class="btn btn-dark" @click="onClick($event)">
      {{ name }}
    </button>
</template>

<script>
export default {
  name: 'LButton',

  props: {
    loading: {
      required: true,
      type: Boolean,
      default: false,
    },
    name: {
      required: true,
      type: String,
      default: "Save",
    },
  },

  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
}
</script>
