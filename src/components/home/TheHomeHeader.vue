<template>
  <div class="theHomeHeader">
    <div class="theHomeHeader__appBar">
      <div class="appBar__logo">
        <img
          class="app-logo"
          src="../../assets/img/thriftier-black.svg"
          alt="app logo"
        >
        <h1>thriftier</h1>
      </div>
      <v-btn
        class="ma-0"
        icon
        @click="handleSignOutClick"
      >
        <v-icon
          large
          color="dark"
        >
          power_settings_new
        </v-icon>
      </v-btn>
    </div>


    <div class="theHomeHeader__action">
      <v-btn
        class="action__btn elevation-1"
        round
        small
        @click="handleCreatePeriodClick"
      >
        <span class="px-2">create period</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import notifications from '../../mixins/notifications';

export default {
  name: 'TheHomeHeader',
  mixins: [notifications],
  methods: {
    handleSignOutClick() {
      this.$emit('onSignOut');
    },
    handleCreatePeriodClick() {
      this.$emit('onCreatePeriod');
    },
  },
};
</script>

<style lang="scss" scoped>
.theHomeHeader {
  padding-top: 2rem;
  padding-bottom: 0;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  &__appBar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .appBar__logo {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      height: 5rem;

      --line-height: 2rem;

      img {
        height: var(--line-height);
        padding-right: 0.5rem;
      }

      h1 {
        font-size: var(--line-height);
        font-weight: 600;
        color: $dark;
        letter-spacing: 1px;
      }
    }
  }

  &__action {
    display: flex;
    justify-content: flex-end;
  }

  .action__btn {
    border: 1px solid $dark;
    background-color: $light !important;
    text-transform: lowercase;
  }
}
</style>
