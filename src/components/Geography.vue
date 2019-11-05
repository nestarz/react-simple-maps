<template>
  <path role="geography" class="rsm-geography" :d="geography.svgPath" v-bind="$attrs">
    <slot />
  </path>
</template>

<script>
export default {
  props: {
    geography: { type: Object, required: true }
  }
};
</script>