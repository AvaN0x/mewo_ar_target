<template>
  <GameBase :bulls-eyes="bullsEyes" @hit="onHit" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    bullsEyes: [
      {
        id: 1,
        position: '-3 0 -8',
        rotation: '0 0 0',
        down: false,
      },
      {
        id: 2,
        position: '0 0 -8',
        rotation: '0 0 0',
        down: false,
      },
      {
        id: 3,
        position: '3 0 -8',
        rotation: '0 0 0',
        down: false,
      },
    ] as BullsEye[],
  }),
  methods: {
    onHit({ bullsEye }: GameBaseOnHit) {
      // Set bulls eye down and up after a time between 1 and 3 second
      bullsEye.down = true;

      setTimeout(() => {
        bullsEye.down = false;
      }, (Math.random() * 2 + 1) * 1000);
    },
  },
});
</script>

<style lang="scss" scoped></style>
