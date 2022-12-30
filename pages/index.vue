<template>
  <div class="container">
    <div class="logo">
      <h2>MEWO</h2>
      <h1>BullsEye</h1>
    </div>
    <div class="nav">
      <GameLink to="/game/easy">Game easy</GameLink>
      <GameLink to="/game/normal">Game normal</GameLink>
      <GameLink to="/game/hard">Game hard</GameLink>
      <GameLink to="/game/playground">Playground</GameLink>
    </div>
    <div class="copyright">
      <span
        >By
        <a href="https://github.com/AvaN0x" target="_blank"
          >Clément RICATTE</a
        ></span
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #4e77b9;

  .logo {
    font-family: 'Rubik Vinyl';
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;

    & > * {
      padding: 0;
      margin: 0;
    }

    $font-size: 3rem;
    & h1 {
      font-size: $font-size;
    }
    & h2 {
      font-size: $font-size * 0.6;
      margin-bottom: $font-size * -0.1;
    }
  }

  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: min(90%, 400px);
    padding: 0 1rem;
  }

  .copyright {
    font-style: 'Indie Flower';
    color: white;
    font-size: 1rem;
    a {
      color: white;
    }
  }

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
}
</style>
