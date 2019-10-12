<template>
  <div class="provider">
    <slot />
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
  provide() {
    return {
      mapContext: this.value
    };
  },
  props: {
    width: Number,
    height: Number,
    projection: [String, Function],
    projectionConfig: Object
  },
  computed: {
    value() {
      const projection = makeProjection({
        projectionConfig: this.projectionConfig,
        projection: this.projection,
        width: this.width,
        height: this.height
      });

      return {
        width: this.width,
        height: this.height,
        projection,
        path: geoPath().projection(projection)
      };
    }
  }
};
</script>
