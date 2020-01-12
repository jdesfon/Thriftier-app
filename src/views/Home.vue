<template>
  <div class="home">
    <BaseLoader :is-loading="isLoading" />

    <div class="home__header">
      <TheHomeHeader
        @onCreatePeriod="onCreatePeriodClick"
        @onSignOut="handleSignOut"
      />
    </div>

    <section class="home__periods">
      <PeriodList />
    </section>

    <v-dialog
      v-model="createPeriodSheet"
      fullscreen
      transition="dialog-bottom-transition"
      hide-overlay
    >
      <div
        v-touch="{ down: () => createPeriodSheet = false }"
        class="createPeriodSheet"
      >
        <v-btn
          icon
          color="white"
          @click="createPeriodSheet = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <CreatePeriodForm @close="createPeriodSheet = false" />
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { USER, SIGN_OUT } from '../store/modules/user-types';
import { PERIOD, LIST_PERIODS } from '../store/modules/period-types';
import BaseLoader from '../components/BaseLoader.vue';
import CreatePeriodForm from '../components/periods/CreatePeriodForm.vue';
import PeriodList from '../components/periods/PeriodList.vue';
import TheHomeHeader from '../components/home/TheHomeHeader.vue';

export default {
  name: 'Home',
  components: {
    BaseLoader,
    CreatePeriodForm,
    PeriodList,
    TheHomeHeader,
  },
  data: () => ({
    createPeriodSheet: false,
    isLoading: true,
  }),
  mounted() {
    Promise.all([
      this.fetchOpenPeriods(),
      this.fetchClosePeriods(),
    ]).then(() => {
      this.isLoading = false;
    });
  },
  methods: {
    ...mapActions(USER, {
      signOut: SIGN_OUT,
    }),
    ...mapActions(PERIOD, {
      listPeriods: LIST_PERIODS,
    }),
    fetchOpenPeriods() {
      this.listPeriods(1);
    },
    fetchClosePeriods() {
      this.listPeriods(0);
    },
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

  &__periods {
    height: calc(100% - 9rem);
  }
}

.createPeriodSheet {
  background-color: $light;
  height: 100%;
}
</style>
