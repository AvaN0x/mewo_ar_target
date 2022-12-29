<template>
  <div>
    <GameBase
      :bulls-eyes="bullsEyes"
      :scene-bind="{ cursor: 'rayOrigin: mouse;' }"
      wasd-controls
      @hit="onHit"
    >
      <template #entities>
        <AxisEntity />
      </template>

      <template #hud>
        <TopBar />
        <TapToShoot />
      </template>
    </GameBase>
  </div>
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
        down: true,
      },
      {
        id: 4,
        position: '-3 0 8',
        rotation: '0 180 0',
        down: false,
      },
      {
        id: 5,
        position: '0 0 8',
        rotation: '0 180 0',
        down: true,
      },
      {
        id: 6,
        position: '3 0 8',
        rotation: '0 180 0',
        down: false,
      },
      {
        id: 7,
        position: '-8 0 -3',
        rotation: '0 90 0',
        down: false,
      },
      {
        id: 8,
        position: '-8 0 0',
        rotation: '0 90 0',
        down: false,
      },
      {
        id: 9,
        position: '-8 0 3',
        rotation: '0 90 0',
        down: false,
      },
      {
        id: 10,
        position: '8 0 -3',
        rotation: '0 270 0',
        down: true,
      },
      {
        id: 11,
        position: '8 0 0',
        rotation: '0 270 0',
        down: true,
      },
      {
        id: 12,
        position: '8 0 3',
        rotation: '0 270 0',
        down: true,
      },
    ] as BullsEye[],
  }),
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

<style lang="css" scoped></style>
