<template>
  <GameBase :bulls-eyes="bullsEyes" @hit="onHit" />
</template>

<script lang="ts">
import Vue from 'vue';
import { generatePositionAndRotationWithAngle } from '~/functions/coordinates';

export default Vue.extend({
  data() {
    const bullsEyes = [] as BullsEye[];
    const count = 3;

    // Generate the bullseyes around the center of the scene with an angle of 20 degrees between each
    for (let i = 0; i <= count; i++) {
      bullsEyes.push({
        id: i,
        ...generatePositionAndRotationWithAngle(-8, i * 20 - (count / 2) * 20),
        down: false,
      });
    }

    return {
      bullsEyes,
    };
  },
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
