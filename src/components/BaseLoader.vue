<template>
  <img
    v-if="isLoading"
    class="baseLoader"
    src="../assets/img/svg_loader.svg"
  >
</template>

<script>
export default {
  name: 'BaseLoader',
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.baseLoader {
  max-width: 100%;
  height: auto;
  position: relative;
  transform: translate(25%)
}
</style>
