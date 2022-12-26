<template>
  <div>
    <CameraScene v-slot="{ hasCamera }">
      <a-entity camera look-controls position="0 1 0">
        <!-- Entity as cursor -->
        <CustomCursor />
      </a-entity>

      <BullsEye
        v-for="bullsEye in bullsEyes"
        :key="bullsEye.id"
        :position="bullsEye.position"
        :rotation="bullsEye.rotation"
        :down="bullsEye.down"
        @hit="onHit({ ...$event, bullsEyeId: bullsEye.id })"
      />
      <EntityElementRenderer ref="renderer" />

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
import type { Vector3 } from 'three';
import ObjectPoint from '~/components/object/Point.vue';
import EntityElementRenderer from '~/components/EntityElementRenderer.vue';

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
      id: circleId,
      position,
    }: {
      bullsEyeId: number;
      id: number;
      position: Vector3;
    }) {
      // Get bulls eye
      const bullsEye = this.bullsEyes.find((b) => b.id === bullsEyeId);
      if (!bullsEye || bullsEye.down) {
        return;
      }

      // Set bulls eye down and up after 1 second
      bullsEye.down = true;
      setTimeout(() => {
        bullsEye.down = false;
      }, 1000);

      // Render added points
      const ComponentClass = Vue.extend(ObjectPoint);
      const instance = new ComponentClass({
        propsData: {
          position: `${position.x} ${position.y} ${position.z}`,
          rotation: bullsEye.rotation,
          value: circleId,
          color: '#56b700',
        },
      });
      instance.$mount();

      (
        this.$refs.renderer as InstanceType<typeof EntityElementRenderer>
      ).addEntityElement({
        instance,
        duration: 1000,
        // removeFunction: () => {},
      });
    },
  },
});
</script>

<style lang="css" scoped></style>
