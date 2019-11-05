<template>
  <div class="provider">
    <slot v-bind="{path, projectionFunc}" />
  </div>
</template>

<script>
import { watch, ref, computed, provide, reactive } from "@vue/composition-api";

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

import { ContextSymbol } from "./utils";

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
    svg: SVGSVGElement
  },
  setup(props) {
    const svg = computed(() => props.svg);
    const projectionConfig = computed(() => props.projectionConfig);
    const projectionName = computed(() => props.projectionName);
    const width = computed(() => props.width);
    const height = computed(() => props.height);

    const projectionFunc = ref(null);
    const path = computed(() => geoPath().projection(projectionFunc.value));

    provide(
      ContextSymbol,
      reactive({
        projectionFunc,
        path
      })
    );

    watch([projectionConfig, projectionName, width, height], () => {
      projectionFunc.value = makeProjection({
        projectionConfig: projectionConfig.value,
        projection: projectionName.value,
        width: width.value,
        height: height.value
      });
    });

    watch([svg], () => {
      console.log("okla");
      select(svg.value).call(drag(projectionFunc.value, path.value, svg.value));
      select(svg.value).call(zoom(projectionFunc.value, path.value, svg.value));
    });

    watch([projectionFunc, path], () => {
      console.log("okla");
      select(svg.value).call(drag(projectionFunc.value, path.value, svg.value));
      select(svg.value).call(zoom(projectionFunc.value, path.value, svg.value));
    });

    return {
      path,
      projectionFunc
    };
  }
};
</script>
