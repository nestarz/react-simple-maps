<template>
  <div class="provider">
    <slot v-bind="{path, projectionFunc}" />
  </div>
</template>

<script>
import { select } from "d3";
import { zoom, drag } from "./useZoom.js";

import {
  geoPath,
  geoEqualEarth,
  geoMercator,
  geoTransverseMercator,
  geoAlbers,
  geoAlbersUsa,
  geoAzimuthalEqualArea,
  geoAzimuthalEquidistant,
  geoOrthographic,
  geoConicConformal,
  geoConicEqualArea,
  geoConicEquidistant
} from "d3-geo";

const projections = {
  geoEqualEarth,
  geoMercator,
  geoTransverseMercator,
  geoAlbers,
  geoAlbersUsa,
  geoAzimuthalEqualArea,
  geoAzimuthalEquidistant,
  geoOrthographic,
  geoConicConformal,
  geoConicEqualArea,
  geoConicEquidistant
};

const makeProjection = ({
  projectionConfig = {},
  projection = "geoEqualEarth",
  width = 800,
  height = 500
}) => {
  const isFunc = typeof projection === "function";

  if (isFunc) return projection;

  let proj = projections[projection]().translate([width / 2, height / 2]);

  const supported = [
    proj.center ? "center" : null,
    proj.rotate ? "rotate" : null,
    proj.scale ? "scale" : null,
    proj.parallels ? "parallels" : null
  ];

  supported.forEach(d => {
    if (!d) return;
    proj = proj[d](projectionConfig[d] || proj[d]());
  });

  return proj;
};

export default {
  props: {
    width: Number,
    height: Number,
    projection: [String, Function],
    projectionConfig: Object,
    svg: SVGSVGElement,
  },
  provide() {
    const context = {};
    Object.defineProperty(context, "projection", {
      get: () => this.projectionFunc
    });
    Object.defineProperty(context, "test", {
      get: () => this.test
    });
    Object.defineProperty(context, "path", {
      get: () => this.path
    });
    return { context };
  },
  data() {
    return {
      projectionFunc: null,
      path: null,
      test: null
    };
  },
  mounted() {
    setInterval(() => this.test = Math.random(10), 2000); //hack-for-reactivity
    this.$watch(
      vm => [vm.width, vm.height, vm.projection, vm.projectionConfig, vm.svg],
      val => {
        const projection = makeProjection({
          projectionConfig: this.projectionConfig,
          projection: this.projection,
          width: this.width,
          height: this.height
        });
        this.projectionFunc = projection;
        this.path = geoPath().projection(projection);

        select(this.svg).call(drag(this.projectionFunc, this.path, this.svg));
        select(this.svg).call(zoom(this.projectionFunc, this.path, this.svg));
      },
      { immediate: true, deep: true }
    );
  }
};
</script>
