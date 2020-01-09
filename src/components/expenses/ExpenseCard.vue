<template>
  <div class="expenseCard">
    <div
      class="expenseCard--collapse"
      :class="[ alternate ? 'expenseCard--alternate' : 'expenseCard--default' ]"
    >
      <span class="expenseCard__title">{{ expense.title }}</span>
      <v-btn
        class="expenseCard__btn"
        small
        icon
        color="greyDark"
        @click="isDetailCardVisible = !isDetailCardVisible"
      >
        <v-icon
          v-if="isDetailCardVisible"
          color="white"
        >
          keyboard_arrow_down
        </v-icon>
        <v-icon
          v-else
          color="white"
        >
          keyboard_arrow_up
        </v-icon>
      </v-btn>
      <span class="expenseCard__amount">{{ expense.amount }} €</span>
    </div>

    <div
      v-if="isDetailCardVisible"
      class="expenseCard__details"
    >
      <div class="details__infos">
        <div class="infos__category">
          <span class="infos__category--title">category</span>
          <span class="infos__category--name">{{ expenseCategory }}</span>
        </div>
        <div class="infos__footer">
          <div class="footer__text">
            <span class="footer__text--price">{{ expense.amount }} €</span>
            <span class="footer__text--date">{{ formattedDate }}</span>
          </div>
          <div class="footer__action">
            <v-icon
              color="black"
              @click="isExpenseActionsVisible = true"
            >
              more_vert
            </v-icon>
          </div>
        </div>
      </div>

      <v-img
        v-if="receiptUrl"
        contain
        aspect-ratio="1"
        max-height="205px"
        max-width="210px"
        position="right bottom"
        :src="receiptUrl"
      />

      <div
        v-if="!receiptUrl"
        class="details__receipt"
      >
        attached receipt
      </div>
    </div>

    <v-bottom-sheet
      v-model="isExpenseActionsVisible"
      inset
    >
      <TheExpenseActions
        :expense="expense"
        @onCloseExpenseActions="isExpenseActionsVisible = false"
      />
    </v-bottom-sheet>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import TheExpenseActions from './TheExpenseActions.vue';
import { EXPENSE, FETCH_RECEIPT_URL } from '../../store/modules/expense-types';

export default {
  name: 'ExpenseCard',
  components: { TheExpenseActions },
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
  data: () => ({
    isDetailCardVisible: false,
    isExpenseActionsVisible: false,
    receiptUrl: null,
  }),
  computed: {
    formattedDate() {
      return moment(this.expense.createdAt)
        .format('MMM Do - HH:mm');
    },
    expenseCategory() {
      return this.expense.categoryName ? this.expense.categoryName : 'uncategorized';
    },
  },
  mounted() {
    if (this.expense.receipt) {
      this.fetchReceiptUrl({
        fileKey: this.expense.receipt,
        idExpense: this.idexpense,
      })
        .then((receiptUrl) => {
          this.receiptUrl = receiptUrl;
        });
    }
  },
  methods: {
    ...mapActions(EXPENSE, {
      fetchReceiptUrl: FETCH_RECEIPT_URL,
    }),
  },
};
</script>

<style lang="scss" scoped>
.expenseCard {
  border-bottom: 0.5px solid $dark;

  &--collapse {
    padding: 0 1.7rem;
    height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &--default {
    background-color: $light;
  }

  &--alternate {
    background-color: $light-alternate;
  }

  &__title {
    width: 50%;
    color: $dark;
    font-weight: 600;
  }

  &__amount {
    min-width: 5.5rem;
    padding: 0.5rem 1rem;
    line-height: 1rem;
    font-weight: bolder;
    color: $black;
    text-align: center;
  }

  &__details {
    height: 15.3rem;
    padding: 1.7rem;
    background-color: $light;
    display: flex;
    justify-content: space-between;

    .details__infos {
      flex-grow: 1;
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
        }
      ;

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
        }
      ;
      }

    }

    .details__receipt {
      background-color: $grey;
      padding: 0 1.5rem;
      display: flex;
      max-height: 100%;
      justify-content: center;
      align-items: center;
      font-size: 0.8rem;
    }

  }
}
</style>
