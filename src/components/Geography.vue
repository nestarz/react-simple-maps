<template>
  <path
    role="geography"
    tabindex="0"
    class="rsm-geography"
    :d="geography.svgPath"
    :onMouseEnter="handleMouseEnter"
    :onMouseLeave="handleMouseLeave"
    :onFocus="handleFocus"
    :onBlur="handleBlur"
    :onMouseDown="handleMouseDown"
    :onMouseUp="handleMouseUp"
  >
    <slot />
  </path>
</template>

<script>
//export default memo(Geography)

export default {
  props: {
    geography: Object,
    onMouseEnter: Function,
    onMouseLeave: Function,
    onMouseDown: Function,
    onMouseUp: Function,
    onFocus: Function,
    onBlur: Function
  },
  computed: {},
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