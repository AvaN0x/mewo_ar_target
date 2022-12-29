<template>
  <div>
    <CameraScene v-slot="{ hasCamera }" v-bind="sceneBind">
      <a-entity camera look-controls position="0 2 0" v-bind="cameraBind">
        <slot name="cursor">
          <CustomCursor />
        </slot>
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

      <slot name="entities" :has-camera="hasCamera"></slot>

      <slot name="background" :has-camera="hasCamera">
        <a-sky v-if="!hasCamera" color="#4e77b9" />
        <a-plane
          v-if="!hasCamera"
          color="#98cf44"
          height="20"
          width="20"
          rotation="-90 0 0"
        />
      </slot>
    </CameraScene>
    <slot name="hud"></slot>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ObjectAnimatedText from '~/components/object/AnimatedText.vue';
import type EntityElementRenderer from '~/components/EntityElementRenderer.vue';

export default Vue.extend({
  props: {
    bullsEyes: {
      type: Array as () => BullsEye[],
      required: true,
    },
    sceneBind: {
      type: Object as PropType<Record<string, any>>,
      required: false,
      default: () => ({}),
    },
    cameraBind: {
      type: Object as PropType<Record<string, any>>,
      required: false,
      default: () => ({}),
    },
  },
  methods: {
    onHit({ bullsEyeId, id: circleId, position }: BullsEyeOnHit) {
      // Get bulls eye
      const bullsEye = this.bullsEyes.find((b) => b.id === bullsEyeId);
      if (!bullsEye || bullsEye.down) {
        return;
      }

      const points = circleId;

      // Render added points text
      const ComponentClass = Vue.extend(ObjectAnimatedText);
      const instance = new ComponentClass({
        propsData: {
          position: `${position.x} ${position.y} ${position.z}`,
          rotation: bullsEye.rotation,
          label: `+${points}`,
          color: '#56b700',
        },
      });
      instance.$mount();

      const renderer = this.$refs.renderer as InstanceType<
        typeof EntityElementRenderer
      >;
      renderer.addEntityElement({
        instance,
        duration: 1000,
      });

      // Emit hit event for parent
      this.$emit('hit', {
        bullsEye,
        bullsEyeId,
        circleId,
        position,
        points,
        renderer,
      } as GameBaseOnHit);
    },
  },
});
</script>

<style lang="css" scoped></style>
