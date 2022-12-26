<template>
  <a-entity ref="container" :position="position" :rotation="rotation">
  </a-entity>
</template>

<script lang="ts">
import { Entity } from 'aframe';
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
  methods: {
    addEntityElement({ instance, duration, removeFunction }: EntityElement) {
      const container = this.$refs.container as Entity;
      container.appendChild(instance.$el);

      if (duration !== undefined && duration > 0) {
        setTimeout(() => {
          if (removeFunction !== undefined) {
            removeFunction();
          }
          container.removeChild(instance.$el);
          instance.$destroy();
        }, duration);
      }
    },
  },
});
</script>

<style lang="css" scoped></style>
