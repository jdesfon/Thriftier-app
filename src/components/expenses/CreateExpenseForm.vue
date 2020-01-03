<template>
  <div class="createExpenseForm">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="title"
        label="title"
        placeholder="enter an expense title"
        :rules="titleRules"
      />

      <v-text-field
        v-model="amount"
        label="Amount"
        placeholder="enter the amount"
        type="number"
        min="0"
        :rules="amountRules"
        validate-on-blur
        clearable
      />

      <v-select
        v-model="transactionType"
        :items="transactionTypes"
        item-value="idtransaction_type"
        item-text="type"
        label="TransactionType"
        placeholder="select a transaction type"
      />

      <v-btn
        class="submit-button"
        block
        round
        color="blue"
        @click="handleSubmit"
      >
        <span class="submit-button__text">submit</span>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {
  EXPENSE,
  CREATE_EXPENSE,
} from '../../store/modules/expense-types';

import {
  TRANSACTION_TYPE,
  LIST_TRANSACTION_TYPES,
  GET_TRANSACTION_TYPES,
} from '../../store/modules/transactionType-types';

export default {
  name: 'CreateExpenseForm',
  props: {
    fkPeriod: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    valid: true,
    transactionType: '',
    title: '',
    titleRules: [
      v => !!v || 'this field is required',
    ],
    amount: '',
    amountRules: [
      v => !!v || 'this field is required',
    ],
  }),
  computed: {
    ...mapGetters(TRANSACTION_TYPE, {
      transactionTypes: GET_TRANSACTION_TYPES,
    }),
  },
  mounted() {
    this.listTransactionTypes();
  },
  methods: {
    ...mapActions(EXPENSE, {
      createExpense: CREATE_EXPENSE,
    }),
    ...mapActions(TRANSACTION_TYPE, {
      listTransactionTypes: LIST_TRANSACTION_TYPES,
    }),
    handleSubmit() {
      console.log('submit');
    },
  },

};
</script>

<style lang="scss" scoped>
.createExpenseForm {
    padding: 1.2rem;
}

.submit-button {
    margin-top: 1rem;
    &__text {
      color: $light;
      font-weight: bold;
    }
}
</style>
