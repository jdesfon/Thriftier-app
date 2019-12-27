<template>
  <div class="baseAppTitleLogo">
    <span class="baseAppTitleLogo__app-name">thriftier</span>
    <span class="baseAppTitleLogo__devise">handling money with care</span>
  </div>
</template>

<script>
export default {
  name: 'BaseAppTitleLogo',
};
</script>

<style lang="scss" scoped>
.baseAppTitleLogo {
  display: flex;
  flex-direction: column;
  position: relative;

    &__app-name {
        margin-left: 50px;
        font-size: 3rem;
        line-height: 3rem;
    }

    &__devise {
        font-size: 1rem;
        line-height: 1rem;
    }
    &::before {
        position: absolute;
        left: 0px;
        width: 50px;
        height: 50px;
        background-image: url('../assets/img/thriftier-pig.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        content: '';
    }
}
</style>
