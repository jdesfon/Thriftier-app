<template>
  <input
    class="customTextField elevation-3 my-2"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :autocomplete="autocomplete"
    @change="$emit('change', $event.target.value)"
  >
</template>

<script>
export default {
  name: 'CustomTextField',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: () => '',
    },
    type: {
      type: String,
      default: () => 'text',
    },
    autocomplete: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style lang="scss" scoped>
.customTextField {
  border-radius: 2.5rem;
  background-color: #eeeeee;
  padding-left: 2.5rem;
  height: 5rem;
  width: 100%;
  color: $dark;
  font-size: 1.2rem;

  &::placeholder {
    color: $black;
    font-size: 1.2rem;
  }
}
</style>
