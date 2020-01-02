<template>
  <div class="home">
    <div class="home__header">
      <TheHomeHeader
        @onCreatePeriod="onCreatePeriodClick"
        @onSignOut="handleSignOut"
      />
    </div>

    <section class="periods">
      <h1>periods</h1>
    </section>

    <v-bottom-sheet
      v-model="createPeriodSheet"
      inset
    >
      <div class="createPeriodSheet">
        <v-btn
          icon
          color="white"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <CreatePeriodForm />
      </div>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { USER, SIGN_OUT } from '../store/modules/user-types';

import TheHomeHeader from '../components/home/TheHomeHeader.vue';
import CreatePeriodForm from '../components/periods/CreatePeriodForm.vue';

export default {
  name: 'Home',
  components: { TheHomeHeader, CreatePeriodForm },
  data: () => ({
    createPeriodSheet: false,
  }),
  methods: {
    ...mapActions(USER, {
      signOut: SIGN_OUT,
    }),
    onCreatePeriodClick() {
      this.createPeriodSheet = true;
    },
    handleSignOut() {
      this.signOut();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  padding-top: 9rem;

  &__header {
    height: 9rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
}

.createPeriodSheet {
  background-color: $light;
}
</style>
