<template>
  <div class="home">
    <div class="home__header">
      <TheHomeHeader @onSignOut="handleSignOut" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { USER, SIGN_OUT } from '../store/modules/user-types';
import TheHomeHeader from '../components/home/TheHomeHeader.vue';

export default {
  name: 'Home',
  components: { TheHomeHeader },
  methods: {
    ...mapActions(USER, {
      signOut: SIGN_OUT,
    }),
    handleSignOut() {
      this.signOut();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  &__header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
