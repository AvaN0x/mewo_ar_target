<template>
  <div>
    <video ref="cam" class="cam" autoplay playsinline></video>
    <a-scene v-bind="$attrs">
      <slot :has-camera="hasCamera"></slot>
    </a-scene>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    cameraView: undefined as HTMLMediaElement | undefined,
    constraints: {
      audio: false,
      video: {
        facingMode: 'environment',
      },
    },
    hasCamera: false,
  }),
  async mounted() {
    // Access the device camera and stream to cameraView
    try {
      (this.$refs.cam as HTMLMediaElement).srcObject =
        await navigator.mediaDevices.getUserMedia(this.constraints);
      this.hasCamera = true;
    } catch (error) {
      this.hasCamera = false;
      console.error('An error happened while getting user media.', error);
    }
  },
});
</script>

<style lang="scss" scoped>
.cam {
  position: fixed;
  background-size: 100% 100%;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
}
</style>
