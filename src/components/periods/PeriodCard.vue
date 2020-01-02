<template>
  <div class="periodCard">
    <div class="periodCard__lead">
      <span class="lead__title">{{ period.title }}</span>
      <span class="lead__budget">{{ formattedBuget }}</span>
      <span class="lead__records">10 records</span>
    </div>

    <div class="periodCard__trail">
      <span class="trail__remaining">{{ formattedRemaining }}</span>
      <span class="trail__per-day">{{ formattedPerDay }}</span>
    </div>
  </div>
</template>

<script>
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
      return '498.50 €';
    },
    formattedPerDay() {
      return '20.95/day';
    },
  },
};
</script>

<style lang="scss">
.periodCard {
    background-color: $light;
    width: 100%;
    border-radius: 0.5rem;
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
                color: $grey-dark;
                font-size: 0.8rem;
            }

            &__records {
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
                font-size: 1rem;
                color: $dark;
            }
        }
    }
}
</style>
