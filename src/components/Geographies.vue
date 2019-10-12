<template>
  <g class="rsm-geographies">
    <slot v-bind="{geographies, path, projection}" />
  </g>
</template>

<script>
import {
  fetchGeographies,
  getFeatures,
  prepareFeatures,
  isString
} from "../utils";

export default {
  inject: ["mapContext"],
  props: {
    geography: [String, Object, Array],
    parseGeographies: Function
  },
  data() {
    return {
      features: null
    };
  },
  watch: {
    geography: {
      handler() {
        if (typeof window === `undefined`) return;

        if (isString(this.geography)) {
          fetchGeographies(this.geography).then(geos => {
            if (geos) this.features = getFeatures(geos, this.parseGeographies);
          });
        } else {
          this.features = getFeatures(this.geography, this.parseGeographies);
        }
      },
      immediate: true
    }
  },
  computed: {
    path() {
      return this.mapContext.path;
    },
    projection() {
      return this.mapContext.projection;
    },
    geographies() {
      return prepareFeatures(this.features, this.path);
    }
  }
};
</script>
