<template>
  <map-provider
    :width="width"
    :height="height"
    :projection="projection"
    :projectionConfig="projectionConfig"
  >
    <template v-slot:default="{path, projectionFunc}">
      <svg :viewBox="`0 0 ${width} ${height}`" class="rsm-svg" v-bind="$attrs">
        <slot v-bind="{path, projectionFunc}" />
      </svg>
    </template>
  </map-provider>
</template>

<script>
import mapProvider from "./MapProvider.vue";

export default {
  components: {
    mapProvider
  },
  inheritAttrs: false,
  props: {
    width: { type: Number, default: 800 },
    height: { type: Number, default: 600 },
    projection: { type: [String, Function], default: "geoEqualEarth" },
    projectionConfig: { type: Object, default: () => {} }
  }
};
</script>