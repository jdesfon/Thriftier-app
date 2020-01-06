<template>
  <div class="theHomeHeader">
    <div class="theHomeHeader__appBar">
      <div class="appBar__logo">
        <img
          class="app-logo"
          src="../../assets/img/thriftier-pig.svg"
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
          color="white"
        >
          power_settings_new
        </v-icon>
      </v-btn>
    </div>


    <div class="theHomeHeader__action">
      <v-btn
        class="ma-0 elevation-2"
        round
        small
        @click="handleCreatePeriodClick"
      >
        <span class="small--text">create period</span>
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
        color: $light;
        letter-spacing: 1px;
      }
    }
  }

  &__action {
    display: flex;
    justify-content: flex-end;
  }
}

.small--text {
  font-size: 0.6rem;
  font-weight: bold;
}
</style>
