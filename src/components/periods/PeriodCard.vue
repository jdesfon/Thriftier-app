<template>
  <div
    class="periodCard elevation-2"
    @click="goToPeriod"
  >
    <div class="periodCard__lead">
      <span class="lead__title">{{ period.title }}</span>
      <span class="lead__budget">{{ formattedBuget }}</span>
      <span class="lead__records">{{ period.totalRecords }} records</span>
    </div>

    <div
      v-if="period.isOpen"
      class="periodCard__trail"
    >
      <span
        class="trail__remaining"
        :class="status"
      >{{ formattedRemaining }}</span>
      <span class="trail__per-day">{{ formattedPerDay }}</span>
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
      return `${this.period.budget} €`;
    },
    formattedRemaining() {
      return `${Number(this.period.remaining)
        .toFixed(2)} €`;
    },
    formattedPerDay() {
      return `${Number(this.period.perDay)
        .toFixed(2)} €/day`;
    },
    formattedEndDate() {
      const formattedDate = moment(this.period.endDate)
        .format('MMM Do, YYYY');
      return `closed on: ${formattedDate}`;
    },
    status() {
      const { perDay, remainingPerDay } = this.period;
      const remainingRatio = remainingPerDay / perDay;
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
  border-radius: 0.9rem;
  padding: 0.9rem 1.3rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-family: $body-font-family;
  font-weight: 600;

  &:hover {
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
    0px 6px 10px 0px rgba(0,0,0,0.14),
    0px 1px 18px 0px rgba(0,0,0,0.12) !important;
  }

  &--red {
    color: $red;
  }

  &--orange {
    color: $orange;
  }

  &--green {
    color: $green;
  }

  &__lead {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;

    .lead {
      &__title {
        color: $blue;
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

    .trail {
      &__remaining {
        font-size: 1.75rem;
      }

      &__per-day {
        font-size: 1rem;
        color: $dark;
      }

      &__endDate {
        font-size: 1rem;
        color: $dark;
      }
    }
  }
}
</style>
