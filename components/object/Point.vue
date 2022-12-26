<template>
  <a-entity :position="position" :rotation="rotation">
    <a-text
      :value="`+${value}`"
      position="0 0 0.02"
      :color="color"
      scale="1.2 1.2 1.2"
    ></a-text>
  </a-entity>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    position: {
      type: String,
      required: false,
      default: '0 0 0',
    },
    rotation: {
      type: String,
      required: false,
      default: '0 0 0',
    },
    value: {
      type: Number,
      required: false,
      default: 0,
    },
    color: {
      type: String,
      required: false,
      default: '#ffffff',
    },
  },
});
</script>

<style lang="css" scoped></style>
