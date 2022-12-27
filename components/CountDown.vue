<template>
  <div>
    <slot
      v-bind="{
        value,
        time,
        hours,
        minutes,
        seconds,
        hoursStr,
        minutesStr,
        secondsStr,
      }"
    >
      {{ time }}
    </slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      type: Number,
      required: true,
    },
    interval: {
      type: Number,
      required: false,
      default: 1000,
    },
  },
  data: () => ({
    intervalId: undefined as NodeJS.Timer | undefined,
  }),
  computed: {
    time(): string {
      let res = `${this.minutesStr}:${this.secondsStr}`;
      if (this.hours > 0) {
        res = `${this.hoursStr}:${res}`;
      }
      return res;
    },
    hours(): number {
      return Math.floor(this.value / 1000 / 60 / 60);
    },
    hoursStr(): string {
      return this.numberToTwoDigit(this.hours);
    },
    minutes(): number {
      return Math.floor(this.value / 1000 / 60) % 60;
    },
    minutesStr(): string {
      return this.numberToTwoDigit(this.minutes);
    },
    seconds(): number {
      return Math.floor(this.value / 1000) % 60;
    },
    secondsStr(): string {
      return this.numberToTwoDigit(this.seconds);
    },
  },
  watch: {
    value() {
      // Restart interval if needed
      if (this.intervalId === undefined && this.value > 0) {
        this.startInterval();
      }
    },
  },
  mounted() {
    this.startInterval();
  },
  beforeDestroy() {
    this.stopInterval();
  },
  methods: {
    numberToTwoDigit(value: number): string {
      return value.toLocaleString('en-US', { minimumIntegerDigits: 2 });
    },
    startInterval() {
      this.$emit('start', true);
      this.intervalId = setInterval(() => {
        const value = this.value - this.interval;
        if (value <= 0) {
          this.$emit('input', 0);
          this.$emit('end', true);
          this.stopInterval();
          return;
        }
        this.$emit('input', value);
      }, this.interval);
    },
    stopInterval() {
      if (this.intervalId !== undefined) {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }
    },
  },
});
</script>

<style lang="css" scoped></style>
