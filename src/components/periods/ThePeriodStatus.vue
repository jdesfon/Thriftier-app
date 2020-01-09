<template>
  <div
    class="periodStatus"
  >
    <div class="periodStatus__remaining">
      <span class="periodStatus__title">remaining</span>
      <span class="remaining__value">{{ formattedRemaining }}</span>
    </div>
    <div class="periodStatus__daily-budget">
      <span class="periodStatus__title">daily budget</span>
      <span class="daily__value">
        <v-icon
          :color="status"
          small
        >
          fiber_manual_record
        </v-icon>
        {{ formattedRemainingPerDay }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PeriodStatus',
  props: {
    period: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedRemaining() {
      return `${Number(this.period.remaining)
        .toFixed(2)} €`;
    },
    formattedRemainingPerDay() {
      return `${Number(this.period.remainingPerDay)
        .toFixed(2)} €/day`;
    },
    status() {
      const { perDay, remainingPerDay } = this.period;
      const remainingRatio = remainingPerDay / perDay;
      if (remainingRatio > 0.75 && remainingRatio < 0.95) {
        return 'orange';
      }
      if (remainingRatio < 0.75) {
        return 'red';
      }
      return 'green';
    },
  },
};
</script>

<style lang="scss" scoped>
.periodStatus {
  display: flex;
  justify-content: space-between;
  padding: 1.3rem 1.7rem;
  color: $dark;
  height: 100%;

  &__title {
    font-size: 0.8rem;
    line-height: 0.9rem;
  }

  &__remaining,
  &__daily-budget {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 2.85;
  }

  &__remaining {
    align-items: flex-start;

    .remaining__value {
      font-size: 2rem;
      line-height: 2rem;
      font-weight: 600;
    }
  }

  &__daily-budget {
    align-items: flex-end;

    .daily__value {
      display: flex;
      align-items: flex-end;
      font-size: 1.2rem;
      line-height: 1.2rem;
      font-weight: 600;
    }
  }
}
</style>
