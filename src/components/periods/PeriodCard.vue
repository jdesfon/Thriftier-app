<template>
  <div
    class="periodCard elevation-1"
    :class="status"
    @click="goToPeriod"
  >
    <div class="periodCard__lead">
      <span class="lead__title">{{ period.title }}</span>
      <span class="lead__budget">{{ formattedBuget }}</span>
      <span class="lead__records">{{ formattedEndDate }}</span>
    </div>

    <div
      v-if="period.isOpen"
      class="periodCard__trail"
    >
      <span
        class="trail__remaining"
      >{{ formattedRemaining }}</span>
      <span class="trail__per-day">{{ formattedRemainingPerDay }}</span>
    </div>
    <div
      v-else
      class="periodCard__trail"
    >
      <span class="trail__remaining">{{ formattedRemaining }}</span>
      <span class="trail_endDate">{{ formattedEndDate }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import numberToCurrency from '../../utils/numberFormat';

export default {
  name: 'PeriodCard',
  props: {
    period: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedBuget() {
      return `${numberToCurrency(this.period.budget)}`;
    },
    formattedRemaining() {
      return `${numberToCurrency(this.period.remainingBudget)}`;
    },
    formattedRemainingPerDay() {
      return `${numberToCurrency(this.period.remainingBudgetPerDay)} / day`;
    },
    formattedEndDate() {
      return moment(this.period.endDate)
        .format('MMM Do, YYYY');
    },
    status() {
      const { budgetPerDay, remainingBudgetPerDay } = this.period;
      const remainingRatio = remainingBudgetPerDay / budgetPerDay;
      if (this.period.isOpen === 0) {
        return '';
      }

      if (remainingRatio > 0.75 && remainingRatio < 0.95) {
        return 'periodCard--orange';
      }

      if (remainingRatio < 0.75) {
        return 'periodCard--red';
      }

      return 'periodCard--green';
    },
  },
  methods: {
    goToPeriod() {
      this.$router.push({
        name: 'period',
        params: { id: this.period.idperiod },
      });
    },
  },
};
</script>

<style lang="scss">
.periodCard {
  cursor: pointer;
  background-color: $light;
  width: 100%;
  height: 76px;
  border-radius: .5rem;
  padding: 0.9rem 1.3rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-family: $body-font-family;
  font-weight: 600;
  color: $black;

  &:hover {
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
     0px 2px 2px 0px rgba(0,0,0,0.14),
     0px 1px 5px 0px rgba(0,0,0,0.12) !important;
  }

  &--red {
    border-left: .5rem solid $red;
  }

  &--orange {
    border-left: .5rem solid $orange;
  }

  &--green {
    border-left: .5rem solid $green;
  }

  &__lead {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;

    .lead {
      &__title {
        color: $black;
      }

      &__budget {
        font-size: 0.8rem;
        color: $grey-darker;
      }

      &__records {
        color: $grey-darker;
        font-size: 0.8rem;
      }
    }
  }

  &__trail {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;
    color: $dark;

    .trail {
      &__remaining {
        font-size: 1.75rem;
      }

      &__per-day {
        font-size: 1rem;
      }

      &__endDate {
        font-size: 1rem;
      }
    }
  }
}
</style>
