<template>
  <div>
    <div v-if="status === 'gameOver'" class="game-over-screen">
      <h1>Game Over</h1>
      <p>
        Points: <span>{{ points }}</span>
      </p>
      <p v-if="!disabledCountdown">
        Total Play Time: <span>{{ totalPlayTimeStr }}</span>
      </p>
      <GameLink to="/">Continue</GameLink>
    </div>
    <CameraScene v-slot="{ hasCamera }" v-bind="sceneBind">
      <a-entity camera look-controls position="0 3 0" v-bind="cameraBind">
        <slot name="cursor" :has-camera="hasCamera" :status="status">
          <CustomCursor v-if="status !== 'gameOver'" />
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

      <slot name="entities" :has-camera="hasCamera" :status="status"></slot>

      <slot name="background" :has-camera="hasCamera" :status="status">
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
    <TopBar v-if="status === 'playing'" class="hud-top-bar">
      <div class="hud-top-bar-stats">
        <span> Points: {{ points }} </span>
        <CountDown
          v-if="!disabledCountdown"
          v-model="countdown"
          @end="gameEnd"
        />
      </div>
    </TopBar>

    <TapToShoot v-if="status === 'playing'" />
    <slot name="hud"></slot>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ObjectAnimatedText from '~/components/object/AnimatedText.vue';
import type EntityElementRenderer from '~/components/EntityElementRenderer.vue';
import { msToTimeStr, msToSeconds } from '~/functions/time';

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
    disabledCountdown: {
      type: Boolean,
      required: false,
      default: false,
    },
    countdownDuration: {
      type: Number,
      required: false,
      default: 30000,
    },
    centerBonusTime: {
      type: Number,
      required: false,
      default: 2000,
    },
  },
  data: () => ({
    status: 'playing' as GameStatus,
    points: 0,
    countdown: 30000,
    totalPlayTime: 0 as number,
  }),
  computed: {
    totalPlayTimeStr(): string {
      return msToTimeStr(this.totalPlayTime);
    },
  },
  beforeMount() {
    // Init total play time with countdown
    this.countdown = this.countdownDuration;
    this.totalPlayTime = this.countdownDuration;
  },
  methods: {
    gameEnd() {
      this.status = 'gameOver';
      this.$emit('gameEnd', this.points);
    },
    onHit({ bullsEyeId, id: circleId, position }: BullsEyeOnHit) {
      // Get bulls eye
      const bullsEye = this.bullsEyes.find((b) => b.id === bullsEyeId);
      if (!bullsEye || bullsEye.down) {
        return;
      }

      const points = circleId;
      this.points += points;

      // Render added points text
      const ComponentClass = Vue.extend(ObjectAnimatedText);
      const instance = new ComponentClass({
        propsData: {
          position,
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

      // Add time to countdown if points are 4
      if (!this.disabledCountdown && points === 4) {
        this.countdown += this.centerBonusTime;
        this.totalPlayTime += this.centerBonusTime;

        // Render added time text
        const ComponentClass = Vue.extend(ObjectAnimatedText);
        const instance = new ComponentClass({
          propsData: {
            position: `${position.x + 0.5} ${position.y} ${position.z}`,
            rotation: bullsEye.rotation,
            label: `+${msToSeconds(this.centerBonusTime)}s`,
            color: '#fcba03',
          },
        });
        instance.$mount();

        renderer.addEntityElement({
          instance,
          duration: 1000,
        });
      }

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

<style lang="scss" scoped>
.game-over-screen {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #000a;
  color: white;
  z-index: 2;

  h1 {
    font-size: 3rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
    font-size: 1.3rem;

    span {
      font-weight: bold;
    }
  }

  a {
    width: min(90%, 400px);

    margin-top: 3rem;
  }
}

.hud {
  &-top-bar {
    &-stats {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: space-between;
      margin-left: 2rem;
      user-select: none;

      // Pipe on the left
      &:before {
        content: '';
        position: absolute;
        top: 10%;
        left: -1rem;
        display: block;
        width: 1px;
        height: 80%;
        background-color: #fff;
      }
    }
  }

  &-tap-to-shoot {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

    & > div {
      position: relative;
      display: block;
      background-color: #fffb;
      width: min(20vw, 20vh, 6rem);
      height: min(20vw, 20vh, 6rem);
      border-radius: 50%;
      margin-bottom: 0.5rem;

      &:before {
        $size: 105%;

        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        border: 0.2rem solid #fffb;
        width: $size;
        height: $size;
        border-radius: 50%;
        animation: tap-to-shoot 1s infinite alternate;

        @keyframes tap-to-shoot {
          from {
            width: $size;
            height: $size;
          }
          to {
            width: 110%;
            height: 110%;
          }
        }
      }
    }
  }
}
</style>
