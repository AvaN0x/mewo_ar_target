<template>
  <a-entity :position="position" :rotation="rotation">
    <!-- #region BullsEye and stand -->
    <a-entity ref="bullseye" :rotation="standRotation" position="0 0.1 0">
      <!-- #region BullsEye -->
      <a-entity position="0 1.75 0.25">
        <a-ring
          v-for="(ring, i) in rings"
          :key="i"
          ref="ring"
          :ring-id="ring.id"
          :color="ring.color"
          :radius-inner="ring.radiusInner"
          :radius-outer="ring.radiusOuter"
          bulls-eye-circle
        ></a-ring>

        <a-cylinder
          color="#FFFFFF"
          position="0 0 -0.12"
          rotation="90 0 0"
          height="0.2"
          radius="1"
        ></a-cylinder>
      </a-entity>
      <!-- #endregion BullsEye -->

      <!-- #region Stand -->
      <a-entity position="0 0.75 0">
        <a-box
          color="#606060"
          position="0 0.25 0"
          rotation="0 0 0"
          width="0.4"
          height="2"
          depth="0.1"
        ></a-box>

        <!-- Nails -->
        <a-cylinder
          color="#202020"
          position="0.14 1.14 -0.02"
          rotation="90 0 0"
          height="0.1"
          radius="0.02"
        ></a-cylinder>
        <a-cylinder
          color="#202020"
          position="-0.14 1.14 -0.02"
          rotation="90 0 0"
          height="0.1"
          radius="0.02"
        ></a-cylinder>
        <a-cylinder
          color="#202020"
          position="0.14 0.86 -0.02"
          rotation="90 0 0"
          height="0.1"
          radius="0.02"
        ></a-cylinder>
        <a-cylinder
          color="#202020"
          position="-0.14 0.86 -0.02"
          rotation="90 0 0"
          height="0.1"
          radius="0.02"
        ></a-cylinder>
      </a-entity>
      <!-- #endregion Stand -->
    </a-entity>
    <!-- #endregion BullsEye and stand -->

    <!-- #region Base -->
    <a-entity position="0 0 0">
      <a-cylinder
        color="#606060"
        position="0.27 0 0"
        rotation="0 0 90"
        height="0.15"
        radius="0.3"
        theta-start="0"
        theta-length="180"
      ></a-cylinder>
      <a-cylinder
        color="#606060"
        position="-0.27 0 0"
        rotation="0 0 90"
        height="0.15"
        radius="0.3"
        theta-start="0"
        theta-length="180"
      ></a-cylinder>
      <a-box
        color="#606060"
        position="0 0 0"
        rotation="0 0 0"
        :width="0.27 * 2 + 0.15"
        height="0.1"
        :depth="0.3 * 2"
      ></a-box>

      <a-cylinder
        color="#202020"
        position="0 0.08 0"
        rotation="0 0 90"
        height="0.8"
        radius="0.1"
      ></a-cylinder>
    </a-entity>
    <!-- #endregion Base -->
  </a-entity>
</template>

<script lang="ts">
import { Vector3 } from 'three';
import { Entity } from 'aframe';
import Vue from 'vue';

type Ring = {
  id: number;
  color: string;
  radiusInner: number;
  radiusOuter: number;
};

export default Vue.extend({
  props: {
    position: {
      type: String,
      required: false,
      default: '0 0 0',
    },
    rotation: {
      type: String,
      required: false,
      default: '0 0 0',
    },
    down: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    rings: [
      { id: 4, color: '#FFFF00', radiusInner: 0, radiusOuter: 0.28 },
      { id: 3, color: '#FF0000', radiusInner: 0.28, radiusOuter: 0.52 },
      { id: 2, color: '#0000FF', radiusInner: 0.52, radiusOuter: 0.76 },
      { id: 1, color: '#FFFFFF', radiusInner: 0.76, radiusOuter: 1 },
    ] as Ring[],
    componentName: 'bulls-eye-circle',
  }),
  computed: {
    standRotation(): string {
      return this.down ? '-90 0 0' : '0 0 0';
    },
  },
  watch: {
    down() {
      (this.$refs.bullseye as Entity).setAttribute(
        'animation__changedownstate',
        {
          property: 'rotation',
          to: this.down ? '-90 0 0' : '0 0 0',
          dur: this.down ? 150 : 500,
        }
      );
    },
  },
  mounted() {
    // Unregister components if it already exists
    if (AFRAME.components['bulls-eye-circle']) {
      delete AFRAME.components['bulls-eye-circle'];
    }

    // Add click events to rings
    for (const ring of this.$refs.ring as Element[]) {
      ring.addEventListener('click', (event: any) => {
        if (this.down) {
          return;
        }

        const id = ring.getAttribute('ring-id');
        if (id === null) {
          return;
        }
        const point = event.detail.intersection.point as Vector3;
        this.$emit('hit', { id, point });
      });
    }
  },
});
</script>

<style lang="css" scoped></style>
