<template>
  <div
    v-if="isLoading"
    class="baseLoader text-center"
  >
    <v-progress-circular
      indeterminate
      size="78"
      width="16"
    />
  </div>
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
  z-index: 12;
  background-color: rgba(117,117,117,.3);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
