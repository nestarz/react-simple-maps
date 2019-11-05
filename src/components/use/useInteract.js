import { ref, watch } from "@vue/composition-api";

export default (props, emit) => {
  const isPressed = ref(false);
  const isFocused = ref(false);

  watch(isPressed, () => emit("isPressed", isPressed.value));
  watch(isFocused, () => emit("isFocused", isFocused.value));

  return {
    handleMouseEnter: evt => {
      isFocused.value = true;
      if (props.onMouseEnter) props.onMouseEnter(evt);
    },
    handleMouseLeave: evt => {
      isFocused.value = false;
      if (isPressed.value) isPressed.value = false;
      if (props.onMouseLeave) props.onMouseLeave(evt);
    },
    handleFocus: evt => {
      isFocused.value = true;
      if (props.onFocus) props.onFocus(evt);
    },
    handleBlur: evt => {
      isFocused.value = false;
      if (isPressed.value) isPressed.value = false;
      if (props.onBlur) props.onBlur(evt);
    },
    handleMouseDown: evt => {
      isPressed.value = true;
      if (props.onMouseDown) props.onMouseDown(evt);
    },
    handleMouseUp: evt => {
      isPressed.value = false;
      if (props.onMouseUp) props.onMouseUp(evt);
    }
  };
};
