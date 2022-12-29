<template>
  <a-entity
    :position="position"
    :rotation="rotation"
    cursor="fuse: false"
    raycaster="objects: [data-clickable];"
    geometry="primitive: ring; radiusInner: 0.007; radiusOuter: 0.01"
    material="color: black; shader: flat"
    animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
  >
  </a-entity>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    position: {
      type: String,
      required: false,
      default: '0 0 -1',
    },
    rotation: {
      type: String,
      required: false,
      default: '0 0 0',
    },
  },
});
</script>

<style lang="scss" scoped></style>
