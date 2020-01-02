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
        class="ma-0 elevation-0"
        round
        small
      >
        <span class="small--text">create period</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHomeHeader',
  methods: {
    handleSignOutClick() {
      this.$emit('onSignOut');
    },
  },

};
</script>

<style lang="scss" scoped>
    .theHomeHeader {
        padding-top: 2rem;
        padding-bottom: 0;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        border-bottom: 2px solid red;

        &__appBar {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            --line-height: 2rem;

          .appBar__logo  {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;

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
      font-size: 0.8rem;
      text-transform: lowercase;
    }
</style>
