<template>
  <div class="landing">
    <BaseAppTitle />

    <div class="actions">
      <button
        class="elevation-3 actions__button actions__button--light"
        @click="goSignIn"
      >
        sign in
      </button>
      <button
        class="elevation-3 actions__button"
        @click="goSignUp"
      >
        sign up
      </button>
    </div>
  </div>
</template>

<script>
import BaseAppTitle from '../components/BaseAppTitle.vue';

export default {
  name: 'Landing',
  components: { BaseAppTitle },
  methods: {
    goSignIn() {
      this.$router.push({ name: 'sign-in' });
    },
    goSignUp() {
      this.$router.push({ name: 'sign-up' });
    },
  },
};
</script>

<style lang="scss" scoped>
    .landing {
        background-image: url('../assets/img/thriftier-pig.svg');
        background-position: 50% calc(50% - 2rem);
        background-size: 90vw;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        padding: 4rem 2rem 1rem 2rem;
        color: $light;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .actions {
            width: 100%;
            display: flex;
            flex-direction: column;

            &__button {
                height: 70px;
                background-color: $grey-dark;
                color: $black;
                font-size: 24px;
                font-weight: 600;
                text-transform: uppercase;
                border-radius: 35px;
                margin: 10px 0;

                &--light {
                    background-color: $light;
                }
            }
        }
    }
</style>
