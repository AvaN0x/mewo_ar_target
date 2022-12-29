<template>
  <div>
    <div v-if="status === 'gameOver'" class="game-over-screen">
      <h1>Game Over</h1>
      <p>
        Points: <span>{{ points }}</span>
      </p>
      <p>
        Total Play Time: <span>{{ totalPlayTimeStr }}</span>
      </p>
      <GameLink to="/">Continue</GameLink>
    </div>
    <GameBase :bulls-eyes="bullsEyes" @hit="onHit">
      <!-- Hide cursor on game over -->
      <template v-if="status === 'gameOver'" #cursor><div></div></template>

      <template v-if="status === 'playing'" #hud>
        <div class="hud-top-bar">
          <span> Points: {{ points }} </span>
          <CountDown v-model="countdown" @end="gameEnd"> </CountDown>
        </div>

        <div class="hud-tap-to-shoot">
          <div></div>
          <span>Tap to shoot</span>
        </div>
      </template>
    </GameBase>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { msToTimeStr } from '~/functions/time';

export default Vue.extend({
  data: () => ({
    status: 'playing' as GameStatus,
    points: 0,
    countdown: 600000,
    totalPlayTime: 0 as number,
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
  computed: {
    totalPlayTimeStr(): string {
      return msToTimeStr(this.totalPlayTime);
    },
  },
  mounted() {
    // Init total play time with countdown
    this.totalPlayTime = this.countdown;
  },
  methods: {
    gameEnd() {
      this.status = 'gameOver';
    },
    onHit({
      //   bullsEyeId,
      //   circleId,
      //   position,
      points,
    }: GameBaseOnHit) {
      this.points += points;
      if (points === 4) {
        this.countdown += 2000;
        this.totalPlayTime += 2000;
        // TODO display that a time bonus was added somewhere
      }
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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.2rem 1rem;
    display: flex;
    justify-content: space-between;
    background-color: #000a;
    color: #fff;
    font-size: 1.4rem;
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
