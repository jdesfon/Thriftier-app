<template>
  <div class="theExpenseActions">
    <BaseConfirmDialog
      :message="message"
      :is-confirm-dialog-visible="isConfirmDialogVisible"
      @yes="confirmAction"
      @no="cancelAction"
    />
    <v-list
      dense
    >
      <v-list-tile
        @click="handleDeleteExpense"
      >
        <v-list-tile-action>
          <v-icon color="red">
            delete_outline
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Delete Expense
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { EXPENSE, DELETE_EXPENSE } from '../../store/modules/expense-types';
import BaseConfirmDialog from '../BaseConfirmDialog.vue';

export default {
  name: 'TheExpenseActions',
  components: { BaseConfirmDialog },
  props: {
    expense: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    message: 'hello',
    currentAction: null,
    deleteExpenseData: {
      message: 'Do you really want to delete this expense ?',
      actions: null,
    },
    isConfirmDialogVisible: false,
  }),
  methods: {
    ...mapActions(EXPENSE, {
      deleteExpense: DELETE_EXPENSE,
    }),
    confirmAction() {
      this.currentAction({ idExpense: this.expense.idexpense });
      this.isConfirmDialogVisible = false;
      this.$emit('onCloseExpenseActions');
    },
    cancelAction() {
      this.isConfirmDialogVisible = false;
      this.$emit('onCloseExpenseActions');
    },
    handleDeleteExpense() {
      this.message = this.deleteExpenseData.message;
      this.currentAction = this.deleteExpense;
      this.isConfirmDialogVisible = true;
    },
  },
};
</script>

<style lang="scss">
.theExpenseActions {
    background-color: $light;
}
</style>
