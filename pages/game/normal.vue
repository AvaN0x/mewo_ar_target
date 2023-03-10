<template>
  <GameBase :bulls-eyes="bullsEyes" @hit="onHit" @gameEnd="gameEnd" />
</template>

<script lang="ts">
import Vue from 'vue';
import sampleSize from 'lodash/sampleSize';
import { generatePositionAndRotationWithAngle } from '~/functions/coordinates';

export default Vue.extend({
  data() {
    const bullsEyes = [] as BullsEye[];
    const count = 7;

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
      intervalId: undefined as NodeJS.Timer | undefined,
    };
  },
  mounted() {
    // Toggle down of a random number of bulls eyes every 2 seconds
    this.intervalId = setInterval(() => {
      // Get random count, it is a number between 1 and two third of the bulls eyes length
      const count = Math.floor(
        Math.random() * ((this.bullsEyes.length * 2) / 3) + 1
      );

      const bullsEyes = sampleSize(this.bullsEyes, count);
      for (const bullsEye of bullsEyes) {
        // If bullsEye is up, make it one chance out of two to not get it down
        if (!bullsEye.down && Math.random() > 0.5) {
          continue;
        }

        bullsEye.down = !bullsEye.down;
      }
    }, 2000);
  },
  beforeDestroy() {
    this.stopInterval();
  },
  methods: {
    onHit({ bullsEye }: GameBaseOnHit) {
      // Set bulls eye down
      bullsEye.down = true;
    },
    gameEnd() {
      this.stopInterval();
    },
    stopInterval() {
      if (this.intervalId !== undefined) {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
