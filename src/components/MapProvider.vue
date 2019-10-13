<template>
  <div class="provider">
    <slot v-bind="{path, projectionFunc}" />
  </div>
</template>

<script>
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
    projectionConfig: Object
  },
  data() {
    return {
      projectionFunc: null,
      path: null
    };
  },
  mounted() {
    this.$watch(
      vm => [vm.width, vm.height, vm.projection, vm.projectionConfig],
      val => {
        const projection = makeProjection({
          projectionConfig: this.projectionConfig,
          projection: this.projection,
          width: this.width,
          height: this.height
        });
        this.projectionFunc = projection;
        this.path = geoPath().projection(projection);
      },
      { immediate: true, deep: true }
    );
  }
};
</script>
