<template>
  <div class="landing">
    <BaseAppTitle />

    <div class="actions">
      <v-btn
        round
        large
        dark
        @click="goSignIn"
      >
        sign in
      </v-btn>
      <router-link to="/auth/sign-up">
        <span class="dark--text">Sign up</span>
      </router-link>
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
  },
};
</script>

<style lang="scss" scoped>
.landing {
  position: relative;
  background-image: url('../assets/img/thriftier-black.svg');
  background-position: 50% calc(50% - 2rem);
  background-size: 300px 300px;
  background-attachment: fixed;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  padding: 4rem 2rem 1rem 2rem;
  color: $dark;

  .actions {
    position: absolute;
    bottom: 15vh;
    max-width: 300px;
    width: 80vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
  }
}
</style>
