<template>
  <div class="period">
    <v-btn
      large
      @click="createExpenseSheet = true"
    >
      open form
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
        <CreateExpenseForm :fk-period="fkPeriod" />
      </div>
    </v-bottom-sheet>
  </div>
</template>

<script>
import CreateExpenseForm from '../components/expenses/CreateExpenseForm.vue';

export default {
  name: 'Period',
  components: { CreateExpenseForm },
  data: () => ({
    fkPeriod: null,
    createExpenseSheet: false,
  }),
  mounted() {
    this.fkPeriod = parseInt(this.$route.params.id, 10);
  },
};
</script>

<style lang="scss" scoped>
.period {
    background-color: pink;
}

.createExpenseSheet {
  background-color: $light;
}
</style>
