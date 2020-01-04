<template>
  <div class="period">
    <template v-for="(expense, index) of expenses">
      <ExpenseCard
        :key="index"
        :alternate="index % 2 === 1"
        :expense="expense"
      />
    </template>

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
import ExpenseCard from '../components/expenses/ExpenseCard.vue';
import CreateExpenseForm from '../components/expenses/CreateExpenseForm.vue';

export default {
  name: 'Period',
  components: { CreateExpenseForm, ExpenseCard },
  data: () => ({
    fkPeriod: null,
    createExpenseSheet: false,
  }),
  computed: {
    ...mapGetters(EXPENSE, {
      expenses: GET_EXPENSES,
    }),
  },
  mounted() {
    this.fkPeriod = parseInt(this.$route.params.id, 10);
    this.listExpenses({ periodId: this.fkPeriod });
  },
  methods: {
    ...mapActions(EXPENSE, {
      listExpenses: LIST_EXPENSES,
    }),
  },
};
</script>

<style lang="scss" scoped>
.period {
  position: relative;
  height: 100%;

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
