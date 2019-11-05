<template>
  <g
    class="rsm-marker"
    :transform="transform"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    v-on:focus.native="handleFocus"
    @blur="handleBlur"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <slot />
  </g>
</template>

<script>
export default {
  inject: ["context"],
  props: {
    coordinates: { type: Array, required: true },
    onMouseEnter: Function,
    onMouseLeave: Function,
    onMouseDown: Function,
    onMouseUp: Function,
    onFocus: Function,
    onBlur: Function
  },
  computed: {
    transform() {
      context.update;
      const [x, y] = this.context.projection(this.coordinates);
      return `translate(${x}, ${y})`;
    }
  },
  methods: {
    handleMouseEnter(evt) {
      this.isFocus = true;
      if (this.onMouseEnter) this.onMouseEnter(evt);
    },
    handleMouseLeave(evt) {
      this.isFocused = false;
      if (this.isPressed) this.isPressed = false;
      if (this.onMouseLeave) this.onMouseLeave(evt);
    },
    handleFocus(evt) {
      this.isFocus = true;
      if (this.onFocus) this.onFocus(evt);
    },
    handleBlur(evt) {
      this.isFocus = false;
      if (this.isPressed) this.isPressed = false;
      if (this.onBlur) this.onBlur(evt);
    },
    handleMouseDown(evt) {
      this.isPressed = true;
      if (this.onMouseDown) this.onMouseDown(evt);
    },
    handleMouseUp(evt) {
      this.isPressed = false;
      if (this.onMouseUp) this.onMouseUp(evt);
    }
  },
  watch: {
    isPressed() {
      this.$emit("isPressed", this.isPressed);
    },
    isFocused() {
      this.$emit("isFocused", this.isFocused);
    }
  }
};
</script>
