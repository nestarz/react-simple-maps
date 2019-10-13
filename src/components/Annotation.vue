<template>
  <g :transform="translate" class="rsm-annotation" :class="{ className }">
    <path :d="connectorPath" fill="transparent" v-bind="connectorProps" />
    <slot />
  </g>
</template>

<script>
import { createConnectorPath } from "../utils";

export default {
  props: {
    subject: Array,
    dx: { type: Number, default: 30 },
    dy: { type: Number, default: 30 },
    curve: { type: Number, default: 0 },
    connectorProps: { type: Object, default: { stroke: "#000" } },
    className: String,
    projection: Function
  },
  computed: {
    point() {
      const point = this.projection(this.subject);
      return {
        x: point[0],
        y: point[1]
      };
    },
    translate() {
      return `translate(${this.point.x + this.dx}, ${this.point.y + this.dy})`;
    },
    connectorPath() {
      return createConnectorPath(this.dx, this.dy, this.curve);
    }
  }
};
</script>