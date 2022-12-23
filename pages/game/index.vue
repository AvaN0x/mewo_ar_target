<template>
  <a-scene cursor="rayOrigin: mouse;">
    <AxisEntity />
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
  </a-scene>
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
        down: true,
      },
    ] as BullsEye[],
  }),
  mounted() {
    const bullsEye = this.bullsEyes.find((b) => b.id === 3);
    if (!bullsEye) {
      return;
    }
    setTimeout(() => {
      bullsEye.down = false;
    }, 1000);
  },
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
