<template>
  <path :d="lineData" class="rsm-line" :stroke="stroke" :stroke-width="strokeWidth" :fill="fill" />
</template>

<script>
export default {
  props: {
    from: { type: Array, default: [0, 0] },
    to: { type: Array, default: [0, 0] },
    coordinates: Array,
    stroke: { type: String, default: "currentcolor" },
    strokeWidth: { type: Number, default: 3 },
    fill: { type: String, default: "transparent" },
    path: { type: Function, required: true }
  },
  computed: {
    lineData() {
      return this.path({
        type: "LineString",
        coordinates: this.coordinates || [this.from, this.to]
      });
    }
  }
};
</script>
