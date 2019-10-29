<template>
  <g :transform="translate" class="rsm-annotation">
    <path :d="connectorPath" fill="transparent" v-bind="$attrs" />
    <slot />
  </g>
</template>

<script>
import { createConnectorPath } from "../utils";

export default {
  inject: ["context"],
  inheritAttrs: false,
  props: {
    subject: Array,
    dx: { type: Number, default: 30 },
    dy: { type: Number, default: 30 },
    curve: { type: Number, default: 0 },
    connectorProps: { type: Object, default: () => ({ stroke: "#000" }) }
  },
  computed: {
    point() {
      if (!this.context.projection) return { x: 0, y: 0 };
      console.log("hack-for-reactivity", this.context.test);

      const point = this.context.projection(this.subject);
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