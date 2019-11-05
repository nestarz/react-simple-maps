<template>
  <path :d="lineData" class="rsm-line" :stroke="stroke" :stroke-width="strokeWidth" :fill="fill" />
</template>

<script>
import { inject, computed } from "@vue/composition-api";
import { ContextSymbol } from "./utils";

export default {
  props: {
    from: { type: Array, default: () => [0, 0] },
    to: { type: Array, default: () => [0, 0] },
    coordinates: Array,
    stroke: { type: String, default: "currentcolor" },
    strokeWidth: { type: Number, default: 3 },
    fill: { type: String, default: "transparent" }
  },
  setup(props) {
    const context = inject(ContextSymbol);

    return {
      lineData: computed(() =>
        context.path
          ? context.path({
              type: "LineString",
              coordinates: props.coordinates || [props.from, props.to]
            })
          : ""
      )
    };
  }
};
</script>
