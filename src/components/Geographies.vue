<template>
  <g class="rsm-geographies">
    <slot v-bind="{geographies}" />
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
  inject: ["context"],
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
    geographies() {
      return prepareFeatures(this.features, this.context.path);
    }
  }
};
</script>
