<template>
  <NuxtLink class="button" v-bind="$attrs" v-on="$listeners"
    ><slot></slot
  ></NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  margin: 0.4rem 0.2rem;
  padding: 0.2rem;
  font-size: 1.2rem;
  color: white;
  border: 2px solid white;
  border-radius: 0.2rem;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: white;
    color: black;
  }
}
</style>
