<template>
  <div>
    <div
      v-if="status === 'gameOver'"
      style="
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #000000a0;
        z-index: 2;
        color: white;
      "
    >
      <h1>Game Over</h1>
      <h2>Points: {{ points }}</h2>
      <GameLink to="/" style="width: min(90%, 400px)">Continue</GameLink>
    </div>
    <GameBase :bulls-eyes="bullsEyes" @hit="onHit">
      <!-- Hide cursor on game over -->
      <template v-if="status === 'gameOver'" #cursor><div></div></template>

      <template v-if="status === 'playing'" #hud>
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

        <div
          style="
            position: absolute;
            top: 1rem;
            left: 50%;
            transform: translateX(-50%);
          "
        >
          <span> Points: {{ points }} </span>
          <CountDown v-model="countdown" @end="gameEnd"> </CountDown>
        </div>
      </template>
    </GameBase>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    status: 'playing' as GameStatus,
    points: 0,
    countdown: 6000,
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
        // TODO display that a time bonus was added somewhere
      }
    },
  },
});
</script>

<style lang="css" scoped></style>
