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
            total {{ groupTotal(expensesGroup) }} €
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
      color="blue"
      fab
      @click="createExpenseSheet = true"
    >
      <v-icon
        color="white"
        style="height: auto;"
      >
        add
      </v-icon>
    </v-btn>

    <v-bottom-sheet
      v-model="createExpenseSheet"
      inset
    >
      <div
        v-if="fkPeriod"
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
    </v-bottom-sheet>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import { EXPENSE, LIST_EXPENSES, GET_EXPENSES } from '../store/modules/expense-types';
import { PERIOD, FETCH_PERIOD, GET_PERIOD } from '../store/modules/period-types';
import ExpenseCard from '../components/expenses/ExpenseCard.vue';
import CreateExpenseForm from '../components/expenses/CreateExpenseForm.vue';
import ThePeriodHeader from '../components/periods/ThePeriodHeader.vue';
import ThePeriodStatus from '../components/periods/ThePeriodStatus.vue';

export default {
  name: 'Period',
  components: {
    CreateExpenseForm,
    ExpenseCard,
    ThePeriodHeader,
    ThePeriodStatus,
  },
  data: () => ({
    fkPeriod: null,
    createExpenseSheet: false,
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
    this.listExpenses({ periodId: this.fkPeriod });
    this.fetchPeriod({ periodId: this.fkPeriod });
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
      return expensesGroup[1].reduce((acc, curr) => {
        const sum = acc + curr.amount;
        return sum;
      }, 0);
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
    padding: 0 1.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $light;
    font-size: 0.7rem;
    font-weight: 600;
  }

  .addButton {
    position: absolute;
    opacity: 0.7;
    bottom: 1rem;
    left: 1rem;
  }
}

.createExpenseSheet {
  background-color: $light;
}
</style>
