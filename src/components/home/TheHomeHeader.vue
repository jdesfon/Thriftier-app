<template>
  <div class="theHomeHeader">
    <div class="theHomeHeader__action">
      <v-btn
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

    <div class="theHomeHeader__app-name">
      <img
        class="app-logo"
        src="../../assets/img/thriftier-pig.svg"
        alt="app logo"
      >
      <h1>thriftier</h1>
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
        padding: 2rem;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;

        &__action {
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        &__app-name  {
            --line-height: 3.2rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;

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
</style>
