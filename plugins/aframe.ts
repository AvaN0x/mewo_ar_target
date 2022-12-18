import Vue from 'vue';
import aframe from 'aframe';

Vue.config.ignoredElements = [/^a-/];
Vue.extend(aframe);
