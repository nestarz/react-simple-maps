<template>
  <g
    class="rsm-marker"
    :transform="transform"
    :onMouseEnter="handleMouseEnter"
    :onMouseLeave="handleMouseLeave"
    :onFocus="handleFocus"
    :onBlur="handleBlur"
    :onMouseDown="handleMouseDown"
    :onMouseUp="handleMouseUp"
  >
    <slot />
  </g>
</template>

<script>
export default {
  props: {
    coordinates: { type: Array, required: true },
    projection: { type: Function, required: true },
    onMouseEnter: Function,
    onMouseLeave: Function,
    onMouseDown: Function,
    onMouseUp: Function,
    onFocus: Function,
    onBlur: Function
  },
  computed: {
    transform() {
      const [x, y] = this.projection(this.coordinates);
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
