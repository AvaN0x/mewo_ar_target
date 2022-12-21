<template>
  <a-scene cursor="rayOrigin: mouse;">
    <AxisEntity />
    <a-cylinder color="#FF0000" position="0 0 3"></a-cylinder>
    <a-cylinder color="#FF00FF" position="0 0 -3"></a-cylinder>
    <a-cylinder color="#00FF00" position="3 0 0"></a-cylinder>
    <a-cylinder color="#0000FF" position="-3 0 0"></a-cylinder>
  </a-scene>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="css" scoped></style>
