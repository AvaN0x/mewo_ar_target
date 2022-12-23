<template>
  <a-scene cursor="rayOrigin: mouse;">
    <AxisEntity />
    <BullsEye
      position="0 0 -5"
      rotation="0 0 0"
      @hit="onHit({ ...$event, bullsEyeId: 1 })"
    />
    <a-cylinder color="#FF0000" position="0 0 3"></a-cylinder>
    <a-cylinder color="#FF00FF" position="0 0 -3"></a-cylinder>
    <a-cylinder color="#00FF00" position="3 0 0"></a-cylinder>
    <a-cylinder color="#0000FF" position="-3 0 0"></a-cylinder>
  </a-scene>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    onHit({
      bullsEyeId,
      id: circleId,
      point,
    }: {
      bullsEyeId: number;
      id: number;
      point: any;
    }) {
      console.log(
        'bullsEyeId',
        bullsEyeId,
        'circleId',
        circleId,
        'point',
        point
      );
    },
  },
});
</script>

<style lang="css" scoped></style>
