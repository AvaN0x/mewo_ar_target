<template>
  <a-entity :position="position" :rotation="rotation">
    <!-- Target -->
    <a-entity position="0 1 0">
      <a-ring
        :id="3"
        color="#FFFF00"
        :radius-inner="0"
        :radius-outer="sizes[0]"
        bulls-eye-circle
      ></a-ring>
      <a-ring
        :id="2"
        color="#FF0000"
        :radius-inner="sizes[0]"
        :radius-outer="sizes[1]"
        bulls-eye-circle
      ></a-ring>
      <a-ring
        :id="1"
        color="#0000FF"
        :radius-inner="sizes[1]"
        :radius-outer="sizes[2]"
        bulls-eye-circle
      ></a-ring>
      <a-ring
        :id="0"
        color="#FFFFFF"
        :radius-inner="sizes[2]"
        :radius-outer="sizes[3]"
        bulls-eye-circle
      ></a-ring>

      <a-cylinder
        color="#FFFFFF"
        position="0 0 -0.11"
        rotation="90 0 0"
        height="0.2"
        :radius="sizes[3]"
      ></a-cylinder>
    </a-entity>
  </a-entity>
</template>

<script lang="ts">
import { ComponentDefinition } from 'aframe';
import { Vector3 } from 'three';
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
  },
  data: () => ({
    sizes: [0.28, 0.52, 0.76, 1],
    componentName: 'bulls-eye-circle',
  }),
  mounted() {
    // Unregister components if it already exists
    if (AFRAME.components['bulls-eye-circle']) {
      delete AFRAME.components['bulls-eye-circle'];
    }

    // init function only give the element through this, so we need to
    // save the current this to be able to emit the event
    const vm = this;
    AFRAME.registerComponent('bulls-eye-circle', {
      init: function () {
        this.el.addEventListener('click', (event: any) => {
          const id = this.el.getAttribute('id') as number;
          const point = event.detail.intersection.point as Vector3;
          vm.$emit('hit', { id, point });
        });
      },
    } as ComponentDefinition);
  },
});
</script>

<style lang="css" scoped></style>
