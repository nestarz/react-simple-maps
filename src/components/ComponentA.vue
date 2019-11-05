<template>
  <button v-on:click="count++">You clicked me {{ count }} times.</button>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  setup() {
    return {
      count: ref(0)
    };
  }
};
</script>
