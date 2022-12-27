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

        <a-cylinder color="#FF0000" position="0 0 3"></a-cylinder>
        <a-cylinder color="#FF00FF" position="0 0 -3"></a-cylinder>
        <a-cylinder color="#00FF00" position="3 0 0"></a-cylinder>
        <a-cylinder color="#0000FF" position="-3 0 0"></a-cylinder>
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
        down: false,
      },
    ] as BullsEye[],
  }),
  methods: {
    onHit({ bullsEyeId, circleId, position }: GameBaseOnHit) {
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
