<template>
  <path :d="graticulePath" :fill="fill" :stroke="stroke" class="rsm-graticule" />
</template>

<script>
import { computed, inject } from "@vue/composition-api";

import { geoGraticule } from "d3-geo";

import { ContextSymbol } from "./utils";

export default {
  props: {
    fill: { type: String, default: "transparent" },
    stroke: { type: String, default: "currentcolor" },
    step: { type: Array, default: () => [10, 10] }
  },
  setup(props) {
    const context = inject(ContextSymbol);

    return {
      graticulePath: computed(() =>
        context.path(geoGraticule().step(props.step)())
      )
    };
  }
};
</script>
