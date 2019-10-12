<template>
  <g :transform="`translate(${x + dx}, ${y + dy})`" class="rsm-annotation" :class="{ className }">
    <path :d="connectorPath" fill="transparent" stroke="#000" v-bind="connectorProps" />
    <slot />
  </g>
</template>

<script>
import { createConnectorPath } from "../utils";

export default {
  inject: ["mapContext"],
  props: {
    subject: Array,
    dx: { type: Number, default: 30 },
    dy: { type: Number, default: 30 },
    curve: { type: Number, default: 0 },
    connectorProps: Object,
    className: String
  },
  computed: {
    projection() {
      return this.mapContext.projection;
    },
    coordXY() {
      return this.projection(this.subject);
    },
    connectorPath() {
      return createConnectorPath(this.dx, this.dy, this.curve);
    }
  }
};
</script>