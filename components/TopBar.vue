<template>
  <div class="top-bar">
    <div class="top-bar-leave">
      <NuxtLink to="/">Leave</NuxtLink>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.2rem 1rem;
  background-color: #000a;
  color: #fff;
  font-size: 1.4rem;
  display: flex;

  &-leave {
    a {
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      user-select: none;

      &:before {
        content: '←';
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
