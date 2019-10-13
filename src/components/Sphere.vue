<template>
  <span>
    <defs>
      <clipPath :id="id">
        <path :d="spherePath" />
      </clipPath>
    </defs>
    <path
      :d="spherePath"
      :fill="fill"
      :stroke="stroke"
      :strokeWidth="strokeWidth"
      class="rsm-sphere"
    />
  </span>
</template>

<script>
export default {
  props: {
    id: { type: String, default: "rsm-sphere" },
    fill: { type: String, default: "transparent" },
    stroke: { type: String, default: "currentcolor" },
    strokeWidth: { type: Number, default: 0.5 },
    path: { type: Function, required: true }
  },
  computed: {
    spherePath() {
      return this.path({ type: "Sphere" });
    }
  }
};
</script>

<style scoped>
.rsm-sphere {
  pointer-events: none;
}
</style>
