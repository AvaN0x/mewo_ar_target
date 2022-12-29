<template>
  <div class="tap-to-shoot">
    <div></div>
    <span>Tap to shoot</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.tap-to-shoot {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  pointer-events: none;
  user-select: none;

  & > div {
    position: relative;
    display: block;
    background-color: #fffb;
    width: min(20vw, 20vh, 6rem);
    height: min(20vw, 20vh, 6rem);
    border-radius: 50%;
    margin-bottom: 0.5rem;

    &:before {
      $size: 105%;

      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      border: 0.2rem solid #fffb;
      width: $size;
      height: $size;
      border-radius: 50%;
      animation: tap-to-shoot 1s infinite alternate;

      @keyframes tap-to-shoot {
        from {
          width: $size;
          height: $size;
        }
        to {
          width: 110%;
          height: 110%;
        }
      }
    }
  }
}
</style>
