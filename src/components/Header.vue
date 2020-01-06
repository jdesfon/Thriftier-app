<template>
  <div class="header">
    <BaseAppTitleLogo v-if="logo" />
    <BaseAppTitle v-else />
    <v-btn
      fab
      small
      class="elevation-0"
      @click="redirectTo"
    >
      <i class="material-icons nav-icon">keyboard_arrow_left</i>
    </v-btn>
  </div>
</template>

<script>
import BaseAppTitle from './BaseAppTitle.vue';
import BaseAppTitleLogo from './BaseAppTitleLogo.vue';

export default {
  name: 'Header',
  components: {
    BaseAppTitle,
    BaseAppTitleLogo,
  },
  props: {
    logo: {
      type: Boolean,
      default: () => false,
    },
    redirect: {
      type: String,
      required: true,
    },
  },
  methods: {
    redirectTo() {
      this.$router.push({ name: this.redirect });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .nav-icon {
    color: $blue;
    font-weight: 800;
    font-size: 2rem;
  }
}
</style>
