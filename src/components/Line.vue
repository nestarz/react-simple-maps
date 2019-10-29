<template>
  <path :d="lineData" class="rsm-line" :stroke="stroke" :stroke-width="strokeWidth" :fill="fill" />
</template>

<script>
export default {
  inject: ["context"],
  props: {
    from: { type: Array, default: [0, 0] },
    to: { type: Array, default: [0, 0] },
    coordinates: Array,
    stroke: { type: String, default: "currentcolor" },
    strokeWidth: { type: Number, default: 3 },
    fill: { type: String, default: "transparent" }
  },
  computed: {
    lineData() {
      console.log("hack-for-reactivity", this.context.test);
      return this.context.path ? this.context.path({
        type: "LineString",
        coordinates: this.coordinates || [this.from, this.to]
      }) : '';
    }
  }
};
</script>
