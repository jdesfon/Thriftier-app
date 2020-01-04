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
      <template v-for="(expense, index) of expenses">
        <ExpenseCard
          :key="index"
          :alternate="index % 2 === 1"
          :expense="expense"
        />
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
  },
};
</script>

<style lang="scss" scoped>
.period {
  position: relative;
  height: 100vh;

  &__header {
    height: 7.5rem;
  }

  &__status {
    height: 5.5rem;
  }


  &__list {
    height: calc(100% - 13rem);
    overflow-y: scroll;
    scroll-behavior: smooth;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;  /* Safari and Chrome */
    }
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
