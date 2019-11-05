<template>
  <g class="rsm-marker" :transform="transform">
    <slot />
  </g>
</template>

<script>
import { computed, inject } from "@vue/composition-api";
import { ContextSymbol } from "./utils";

export default {
  props: {
    coordinates: { type: Array, required: true }
  },
  setup(props) {
    const context = inject(ContextSymbol);

    return {
      transform: computed(() => {
        context.update;
        const [x, y] = context.projection(props.coordinates);
        return `translate(${x}, ${y})`;
      })
    };
  }
};
</script>
