<template>
  <div class="createExpenseForm">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="title"
        label="Title"
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
        v-model="fkTransactionType"
        :items="transactionTypes"
        item-value="idtransaction_type"
        item-text="type"
        label="TransactionType"
        placeholder="select a transaction type"
      />

      <v-select
        v-model="fkCategory"
        :items="categories"
        item-value="idcategory"
        item-text="name"
        label="Category"
        placeholder="select a category"
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
import notifications from '../../mixins/notifications';
import {
  EXPENSE,
  CREATE_EXPENSE,
} from '../../store/modules/expense-types';

import {
  TRANSACTION_TYPE,
  LIST_TRANSACTION_TYPES,
  GET_TRANSACTION_TYPES,
} from '../../store/modules/transactionType-types';

import {
  CATEGORY,
  LIST_CATEGORIES,
  GET_CATEGORIES,
} from '../../store/modules/category-types';

export default {
  name: 'CreateExpenseForm',
  mixins: [notifications],
  props: {
    fkPeriod: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    valid: true,
    fkTransactionType: '',
    fkCategory: '',
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
    ...mapGetters(CATEGORY, {
      categories: GET_CATEGORIES,
    }),
  },
  mounted() {
    this.listTransactionTypes();
    this.listCategories();
  },
  methods: {
    ...mapActions(EXPENSE, {
      createExpense: CREATE_EXPENSE,
    }),
    ...mapActions(TRANSACTION_TYPE, {
      listTransactionTypes: LIST_TRANSACTION_TYPES,
    }),
    ...mapActions(CATEGORY, {
      listCategories: LIST_CATEGORIES,
    }),
    handleSubmit() {
      if (this.$refs.form.validate()) {
        const expenseObj = {
          title: this.title,
          amount: this.amount,
          fkPeriod: this.fkPeriod,
          fkTransactionType: this.fkTransactionType,
          fkCategory: this.fkCategory,
        };
        this.createExpense(expenseObj);
        this.$refs.form.reset();
        this.$emit('close');
      } else {
        this.notifyError('Form is invalid!');
      }
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
