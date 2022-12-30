<template>
  <div>
    <GameBase
      :bulls-eyes="bullsEyes"
      :scene-bind="{ cursor: 'rayOrigin: mouse;' }"
      disabled-countdown
      @hit="onHit"
    >
      <template #entities>
        <AxisEntity />
      </template>
    </GameBase>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { generatePositionAndRotationWithAngle } from '~/functions/coordinates';

export default Vue.extend({
  data() {
    const bullsEyes = [] as BullsEye[];
    const count = 360 / 20;

    // Generate the bullseyes around the center of the scene with an angle of 20 degrees between each
    for (let i = 0; i < count; i++) {
      bullsEyes.push({
        id: i,
        ...generatePositionAndRotationWithAngle(-8, i * 20),
        down: Math.random() > 0.8,
      });
    }

    return {
      bullsEyes,
      intervalId: undefined as NodeJS.Timer | undefined,
    };
  },
  mounted() {
    // Make all bullseye go up after 5 seconds
    setTimeout(() => {
      for (const bullsEye of this.bullsEyes) {
        bullsEye.down = false;
      }
    }, 5000);
  },
  methods: {
    onHit({ bullsEye }: GameBaseOnHit) {
      // Set bulls eye down and up after 500ms
      bullsEye.down = true;
      setTimeout(() => {
        bullsEye.down = false;
      }, 500);
    },
  },
});
</script>

<style lang="scss" scoped></style>
