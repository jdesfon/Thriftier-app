<template>
  <div class="landing">
    <BaseAppTitle />

    <div class="actions">
      <v-btn
        round
        large
      >
        sign in
      </v-btn>
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
  position: relative;
  background-image: url('../assets/img/thriftier-pig.svg');
  background-position: 50% calc(50% - 2rem);
  background-size: 90vw;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  padding: 4rem 2rem 1rem 2rem;
  color: $light;

  .actions {
    position: absolute;
    bottom: 15vh;
  }
}
</style>
