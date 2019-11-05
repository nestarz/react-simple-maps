<template>
  <path :d="graticulePath" :fill="fill" :stroke="stroke" class="rsm-graticule" />
</template>

<script>
import { geoGraticule } from "d3-geo";

export default {
  props: {
    fill: { type: String, default: "transparent" },
    stroke: { type: String, default: "currentcolor" },
    step: { type: Array, default: [10, 10] },
    path: { type: Function, required: true }
  },
  computed: {
    graticulePath() {
      return this.path(geoGraticule().step(this.step)());
    }
  }
};
</script>
