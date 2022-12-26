<template>
  <a-entity :position="position" :rotation="rotation">
    <a-text
      :value="`+${value}`"
      position="0 0 0.02"
      :color="color"
      scale="1.5 1.5 1.5"
      align="center"
      animation__pos="property: position; to: 0 2 0.02; dur: 1000; easing: easeInQuad"
      animation__scale="property: scale; to: 0 0 0; dur: 1000; easing: easeInQuad"
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
