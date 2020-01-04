<template>
  <div class="expenseCard">
    <div
      class="expenseCard--collapse"
      :class="[ alternate ? 'expenseCard--alternate' : 'expenseCard--default' ]"
    >
      <span class="expenseCard__title">{{ expense.title }}</span>
      <span class="expenseCard__amount">{{ expense.amount }} €</span>
    </div>

    <div class="expenseCard__details">
      <div class="details__infos">
        <div class="infos__category">
          <span class="infos__category--title">category</span>
          <span class="infos__category--name">shoes</span>
        </div>
        <div class="infos__footer">
          <div class="footer__text">
            <span class="footer__text--price">{{ expense.amount }} €</span>
            <span class="footer__text--date">{{ formattedDate }}</span>
          </div>
          <div class="footer__action">
            <v-icon color="black">
              more_vert
            </v-icon>
          </div>
        </div>
      </div>
      <div class="details__receip">
        attached receip
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ExpenseCard',
  props: {
    expense: {
      type: Object,
      required: true,
    },
    alternate: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    formattedDate() {
      return moment(this.expense.createdAt).format('MMM Do - HH:mm');
    },
  },
};
</script>

<style lang="scss" scoped>
.expenseCard {
    &--collapse {
        padding: 0 1.7rem;
        height: 58px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__details {
        height: 15.3rem;
        padding: 1.7rem;
        background-color: $light;
        display: flex;
        justify-content: space-between;

        .details__infos {
            flex-grow: 100;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .infos {
                &__category {
                    display: flex;
                    flex-direction: column;

                    &--title {
                        font-size: 0.9rem;
                        font-weight: 300;
                    }

                    &--name {
                        font-size: 0.9rem;
                        font-weight: 600;
                    }
                };

                &__footer {
                    display: flex;
                    justify-content: space-between;

                    .footer__text {
                        display: flex;
                        flex-direction: column;

                        &--price {
                            font-size: 1.9rem;
                            font-weight: 600;
                            line-height: 2rem;
                        }

                        &--date {
                            font-size: 0.9rem;
                        }
                    }

                    .footer__action {
                        display: flex;
                        align-items: flex-end;
                    }
                };
            }

        }

        .details__receip {
            background-color: $grey;
            display: flex;
            flex-grow: 57;
            justify-content: center;
            align-items: center;
            font-size: 0.8rem;
        }

    }

    &--default {
        background-color: $light;
    }

    &--alternate {
        background-color: $grey;
    }

    &__title {
        font-weight: 400;
    }

    &__amount {
        background-color: $dark;
        min-width: 5.5rem;
        border-radius: 1rem;
        padding: 0.5rem 1rem;
        line-height: 1rem;
        font-weight: bold;
        color: $light;
        text-align: center;
    }
}
</style>
