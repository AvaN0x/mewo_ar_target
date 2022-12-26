<template>
  <div>
    <CameraScene v-slot="{ hasCamera }">
      <AxisEntity />

      <a-entity camera look-controls position="0 1 0">
        <!-- Entity as cursor -->
        <CustomCursor />
      </a-entity>

      <a-cylinder color="#FF0000" position="0 0 3"></a-cylinder>
      <a-cylinder color="#FF00FF" position="0 0 -3"></a-cylinder>
      <a-cylinder color="#00FF00" position="3 0 0"></a-cylinder>
      <a-cylinder color="#0000FF" position="-3 0 0"></a-cylinder>

      <BullsEye
        v-for="bullsEye in bullsEyes"
        :key="bullsEye.id"
        :position="bullsEye.position"
        :rotation="bullsEye.rotation"
        :down="bullsEye.down"
        @hit="onHit({ ...$event, bullsEyeId: bullsEye.id })"
      />

      <a-sky v-if="!hasCamera" color="#4e77b9" />
      <a-plane
        v-if="!hasCamera"
        color="#98cf44"
        height="20"
        width="20"
        rotation="-90 0 0"
      />
    </CameraScene>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type BullsEye = {
  id: number;
  position: string;
  rotation: string;
  down: boolean;
};

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
    onHit({
      bullsEyeId,
      id: _circleId,
      point: _point,
    }: {
      bullsEyeId: number;
      id: number;
      point: any;
    }) {
      const bullsEye = this.bullsEyes.find((b) => b.id === bullsEyeId);
      if (!bullsEye || bullsEye.down) {
        return;
      }
      bullsEye.down = true;

      setTimeout(() => {
        bullsEye.down = false;
      }, 1000);
    },
  },
});
</script>

<style lang="css" scoped></style>
