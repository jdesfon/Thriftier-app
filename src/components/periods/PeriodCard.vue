<template>
  <div class="periodCard elevation-2">
    <div class="periodCard__lead">
      <span class="lead__title">{{ period.title }}</span>
      <span class="lead__budget">{{ formattedBuget }}</span>
      <span class="lead__records">{{ period.totalRecords }} records</span>
    </div>

    <div
      v-if="period.isOpen"
      class="periodCard__trail"
    >
      <span class="trail__remaining">{{ formattedRemaining }}</span>
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
      return `${this.period.remaining} €`;
    },
    formattedPerDay() {
      return `${this.period.perDay} €/day`;
    },
    formattedEndDate() {
      const formattedDate = moment(this.period.endDate).format('MMM Do, YYYY');
      return `closed on: ${formattedDate}`;
    },
  },
};
</script>

<style lang="scss">
.periodCard {
    background-color: $light;
    width: 100%;
    height: 76px;
    border-radius: 0.9rem;
    padding: 0.9rem 1.8rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    font-family: $body-font-family;
    font-weight: 600;

    &__lead {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .lead {
            &__title {
                color: $dark;
            }

            &__budget {
                line-height: 1.1rem;
                font-size: 0.8rem;
                color: $grey-dark;
            }

            &__records {
                line-height: 1.1rem;
                color: $grey-dark;
                font-size: 0.8rem;
            }
        }
    }

    &__trail {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .trail {
            &__remaining {
                font-size: 1.75rem;
                color: $green;
            }

            &__per-day {
                line-height: 0.6rem;
                font-size: 1rem;
                color: $dark;
            }

            &__endDate {
                line-height: 0.6rem;
                font-size: 1rem;
                color: $dark;
            }
        }
    }
}
</style>
