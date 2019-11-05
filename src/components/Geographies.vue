<template>
  <g class="rsm-geographies">
    <slot v-bind="{geographies}" />
  </g>
</template>

<script>
import { watch, ref, computed, onMounted, inject } from "@vue/composition-api";

import {
  fetchGeographies,
  getFeatures,
  prepareFeatures,
  isString,
  ContextSymbol
} from "./utils";

export default {
  props: {
    geography: [String, Object, Array],
    parseGeographies: Function
  },
  setup(props) {
    const context = inject(ContextSymbol);

    const features = ref(null);
    const geography = computed(() => props.geography);
    const geographies = computed(() =>
      prepareFeatures(features.value, context.path)
    );

    const setup = () => {
      if (typeof window === `undefined`) return;

      if (isString(geography.value)) {
        fetchGeographies(geography.value).then(geos => {
          if (geos) features.value = getFeatures(geos, props.parseGeographies);
        });
      } else {
        features.value = getFeatures(geography.value, props.parseGeographies);
      }
    };

    watch(geography, setup);
    onMounted(setup);

    return {
      geographies
    };
  }
};
</script>
