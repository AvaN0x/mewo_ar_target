<template>
  <a-entity :position="position" :rotation="rotation">
    <a-text
      :value="label"
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
    label: {
      type: String,
      required: false,
      default: '',
    },
    color: {
      type: String,
      required: false,
      default: '#ffffff',
    },
  },
});
</script>

<style lang="scss" scoped></style>
