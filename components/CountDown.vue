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
import {
  msToHours,
  msToHoursStr,
  msToMinutes,
  msToMinutesStr,
  msToSeconds,
  msToSecondsStr,
  msToTimeStr,
} from '~/functions/time';

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
      return msToTimeStr(this.value);
    },
    hours(): number {
      return msToHours(this.value);
    },
    hoursStr(): string {
      return msToHoursStr(this.value);
    },
    minutes(): number {
      return msToMinutes(this.value);
    },
    minutesStr(): string {
      return msToMinutesStr(this.value);
    },
    seconds(): number {
      return msToSeconds(this.value);
    },
    secondsStr(): string {
      return msToSecondsStr(this.value);
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
    startInterval() {
      // Stop interval if already running
      this.stopInterval();

      // Emit start event
      this.$emit('start', true);

      // Start interval
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

<style lang="scss" scoped></style>
