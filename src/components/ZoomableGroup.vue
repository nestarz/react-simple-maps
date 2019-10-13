<template>
  <g :ref="zoomPan.elRef" class="rsm-zoomable-group">
    <g :transform="zoomPan.transformString">
      <slot />
    </g>
  </g>
</template>

<script>
import useZoomPan from "./useZoomPan"; // not working with vue yet

export default {
  props: {
    center: { type: Array, default: [0, 0] },
    zoom: { type: Number, default: 1 },
    minZoom: { type: Number, default: 1 },
    maxZoom: { type: Number, default: 5 },
    zoomSensitivity: { type: Number, default: 0.025 },
    onZoomStart: PropTypes.func,
    onZoomEnd: PropTypes.func,
    onMoveStart: PropTypes.func,
    onMoveEnd: PropTypes.func,
    disablePanning: { type: Boolean, default: false },
    disableZooming: { type: Boolean, default: false }
  },
  computed: {
    zoomPan() {
      const { elRef, position, transformString } = useZoomPan({
        center: this.center,
        zoom: this.zoom,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        zoomSensitivity: this.zoomSensitivity,
        onZoomStart: this.onZoomStart,
        onZoomEnd: this.onZoomEnd,
        onMoveStart: this.onMoveStart,
        onMoveEnd: this.onMoveEnd,
        disablePanning: this.disablePanning,
        disableZooming: this.disableZooming
      });
      return { elRef, position, transformString };
    }
  }
};
</script>
