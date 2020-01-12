<template>
  <div class="periodList">
    <section>
      <h2 class="periodList__title">
        current periods
      </h2>
      <template v-for="(period, index) of openPeriods">
        <PeriodCard
          :key="`periodCard${index}`"
          :period="period"
        />
      </template>
    </section>

    <section v-if="closePeriods.length">
      <h2 class="periodList__title">
        previous periods
      </h2>
      <template v-for="(period, index) of closePeriods">
        <PeriodCard
          :key="`periodCard${index}`"
          :period="period"
        />
      </template>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PeriodCard from './PeriodCard.vue';
import { PERIOD, GET_OPEN_PERIODS, GET_CLOSE_PERIODS } from '../../store/modules/period-types';

export default {
  name: 'PeriodList',
  components: { PeriodCard },
  computed: {
    ...mapGetters(PERIOD, {
      openPeriods: GET_OPEN_PERIODS,
      closePeriods: GET_CLOSE_PERIODS,
    }),
  },
};
</script>

<style lang="scss" scoped>
.periodList {
  margin-top: 2.5rem;
  &__title {
    color: $dark;
    font-size: 0.85rem;
    padding: 0.25rem 0;
  }
}
</style>
