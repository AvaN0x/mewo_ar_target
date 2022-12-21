<template>
  <a-entity :position="position" axis-boxes>
    <!-- Black cube -->
    <a-box
      position="0 0 0"
      rotation="0 0 0"
      width="0.0501"
      height="0.0501"
      depth="0.0501"
      color="#000000"
    ></a-box>

    <!-- X -->
    <a-text value="X" position="0.5 0 0" color="#FF0000"></a-text>
    <a-text
      value="X"
      position="0.7 0 0"
      rotation="0 180 0"
      color="#FF0000"
    ></a-text>
    <a-box
      position="0.25 0 0"
      rotation="0 0 0"
      width="0.5"
      height="0.05"
      depth="0.05"
      color="#FF0000"
    ></a-box>

    <!-- Y -->
    <a-text
      value="Y"
      position="-0.066 0.66 0"
      rotation="0 45 0"
      color="#00FF00"
    ></a-text>
    <a-text
      value="Y"
      position="0.066 0.66 0"
      rotation="0 225 0"
      color="#00FF00"
    ></a-text>
    <a-box
      position="0 0.25 0"
      rotation="0 0 0"
      width="0.05"
      height="0.5"
      depth="0.05"
      color="#00FF00"
    ></a-box>

    <!-- Z -->
    <a-text
      value="Z"
      position="0 0 0.66"
      rotation="0 90 0"
      color="#0000FF"
    ></a-text>
    <a-text
      value="Z"
      position="0 0 0.5"
      rotation="0 270 0"
      color="#0000FF"
    ></a-text>
    <a-box
      position="0 0 0.25"
      rotation="0 0 0"
      width="0.05"
      height="0.05"
      depth="0.5"
      color="#0000FF"
    ></a-box>
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
  },
  data: () => ({}),
  mounted() {
    // Unregister components if it already exists
    if (AFRAME.components['axis-boxes']) {
      delete AFRAME.components['axis-boxes'];
    }

    AFRAME.registerComponent('axis-boxes', {
      init: function () {
        // Zoom in
        this.el.setAttribute('animation__mouseenter', {
          property: 'scale',
          to: '2 2 2',
          startEvents: 'mouseenter',
          dur: 500,
        });
        // Zoom out
        this.el.setAttribute('animation__mouseleave', {
          property: 'scale',
          to: '1 1 1',
          startEvents: 'mouseleave',
          dur: 500,
        });
      },
    });
  },
});
</script>

<style lang="css" scoped></style>
