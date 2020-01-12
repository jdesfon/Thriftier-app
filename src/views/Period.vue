<template>
  <div class="period">
    <div
      v-if="period"
      class="period__header"
    >
      <ThePeriodHeader :period="period" />
    </div>

    <div
      v-if="period"
      class="period__status"
    >
      <ThePeriodStatus :period="period" />
      <BaseLoader :is-loading="isLoading" />
    </div>

    <div class="period__list">
      <template v-for="(expensesGroup, groupIndex) of Object.entries(expensesGroupedByDay)">
        <div
          :key="`group${groupIndex}`"
          class="list-spacer"
        >
          <span>
            {{ formatSpacerDate(expensesGroup[0]) }}
          </span>
          <span>
            {{ groupTotal(expensesGroup) }}
          </span>
        </div>
        <template v-for="(expense, expenseIndex) of expensesGroup[1]">
          <ExpenseCard
            :key="`group${groupIndex}_expense${expenseIndex}`"
            :alternate="expenseIndex % 2 === 1"
            :expense="expense"
          />
        </template>
      </template>
    </div>

    <v-btn
      class="addButton"
      fab
      @click="createExpenseSheet = true"
    >
      <v-icon
        color="black"
        style="height: auto;"
      >
        add
      </v-icon>
    </v-btn>

    <v-dialog
      v-model="createExpenseSheet"
      fullscreen
      transition="dialog-bottom-transition"
      hide-overlay
    >
      <div
        v-if="fkPeriod"
        v-touch="{ down: () => createExpenseSheet = false }"
        class="createExpenseSheet"
      >
        <v-btn
          icon
          color="white"
          @click="createExpenseSheet = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <CreateExpenseForm
          :fk-period="fkPeriod"
          @close="createExpenseSheet = false"
        />
      </div>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import numberToCurrency from '../utils/numberFormat';
import { EXPENSE, LIST_EXPENSES, GET_EXPENSES } from '../store/modules/expense-types';
import { PERIOD, FETCH_PERIOD, GET_PERIOD } from '../store/modules/period-types';
import BaseLoader from '../components/BaseLoader.vue';
import CreateExpenseForm from '../components/expenses/CreateExpenseForm.vue';
import ExpenseCard from '../components/expenses/ExpenseCard.vue';
import ThePeriodHeader from '../components/periods/ThePeriodHeader.vue';
import ThePeriodStatus from '../components/periods/ThePeriodStatus.vue';

export default {
  name: 'Period',
  components: {
    BaseLoader,
    CreateExpenseForm,
    ExpenseCard,
    ThePeriodHeader,
    ThePeriodStatus,
  },
  data: () => ({
    fkPeriod: null,
    createExpenseSheet: false,
    isLoading: true,
  }),
  computed: {
    ...mapGetters(EXPENSE, {
      expenses: GET_EXPENSES,
    }),
    ...mapGetters(PERIOD, {
      period: GET_PERIOD,
    }),
    expensesGroupedByDay() {
      return this.expenses.reduce((acc, curr) => {
        if (!acc[curr.date]) {
          acc[curr.date] = [curr];
        } else {
          acc[curr.date].push(curr);
        }
        return acc;
      }, {});
    },
  },
  mounted() {
    this.fkPeriod = parseInt(this.$route.params.id, 10);
    Promise.all([
      this.listExpenses({ periodId: this.fkPeriod }),
      this.fetchPeriod({ periodId: this.fkPeriod }),
    ]).then(() => {
      this.isLoading = false;
    });
  },
  methods: {
    ...mapActions(EXPENSE, {
      listExpenses: LIST_EXPENSES,
    }),
    ...mapActions(PERIOD, {
      fetchPeriod: FETCH_PERIOD,
    }),
    formatSpacerDate(date) {
      return moment(date)
        .format('MMM Do');
    },
    groupTotal(expensesGroup) {
      const groupTotal = expensesGroup[1].reduce((acc, curr) => {
        const sum = acc + curr.amount;
        return sum;
      }, 0);
      return numberToCurrency(groupTotal);
    },
  },
};
</script>

<style lang="scss" scoped>.period {
  position: relative;
  height: 100vh;

  &__header {
    height: 7.5rem;
  }

  &__status {
    height: 5.5rem;
  }

  &__list {
    background-color: $light;
    height: calc(100% - 13rem);
    overflow-y: scroll;
    scroll-behavior: smooth;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }

  .list-spacer {
    background-color: $dark;
    padding: 0.3rem 1.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $light-alternate;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .addButton {
    position: absolute;
    opacity: 0.7;
    bottom: 1rem;
    background-color: rgba(245,245,245,0.7) !important;
  }
}

.createExpenseSheet {
  background-color: $light;
  height: 100%;
}
</style>
