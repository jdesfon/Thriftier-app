<template>
  <div class="baseAppTitle">
    <span class="baseAppTitle__app-name">thriftier</span>
    <span class="baseAppTitle__devise">handling money with care</span>
  </div>
</template>

<script>
export default {
  name: 'BaseAppTitle',
};
</script>

<style lang="scss" scoped>
.baseAppTitle {
  display: flex;
  flex-direction: column;

  &__app-name {
    font-size: 3rem;
    line-height: 3rem;
  }
  &__devise {
    font-size: 1rem;
    line-height: 1rem;
  }
}
</style>
