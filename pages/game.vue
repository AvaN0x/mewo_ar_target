<template>
  <div>
    <video ref="cam" class="cam" autoplay playsinline></video>
    <NuxtChild />
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
  }),
  async mounted() {
    // Access the device camera and stream to cameraView
    try {
      (this.$refs.cam as HTMLMediaElement).srcObject =
        await navigator.mediaDevices.getUserMedia(this.constraints);
    } catch (error) {
      console.error('An error happened while getting user media.', error);
    }
  },
});
</script>

<style lang="css" scoped>
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
