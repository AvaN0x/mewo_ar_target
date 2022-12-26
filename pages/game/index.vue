<template>
  <div>
    <GameBase :bulls-eyes="bullsEyes" @hit="onHit">
      <template #hud>
        <button
          style="
            position: absolute;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
          "
        >
          Test
        </button>

        <span
          style="
            position: absolute;
            top: 1rem;
            left: 50%;
            transform: translateX(-50%);
          "
          >Points: {{ points }}</span
        >
      </template>
    </GameBase>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import type { Vector3 } from 'three';

export default Vue.extend({
  data: () => ({
    points: 0,
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
    onHit({
      bullsEyeId,
      id: circleId,
      position,
      points,
    }: {
      bullsEyeId: number;
      id: number;
      position: Vector3;
      points: number;
    }) {
      this.points += points;
      console.log(
        'bullsEyeId',
        bullsEyeId,
        'circleId',
        circleId,
        'position',
        position
      );
    },
  },
});
</script>

<style lang="css" scoped></style>
