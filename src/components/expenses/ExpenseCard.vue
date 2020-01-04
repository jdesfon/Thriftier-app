<template>
  <div
    class="expenseCard"
    :class="[ alternate ? 'expenseCard--alternate' : 'expenseCard--default' ]"
  >
    <span class="expenseCard__title">{{ expense.title }}</span>
    <span class="expenseCard__amount">{{ expense.amount }} €</span>
  </div>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
.expenseCard {
    height: 58px;
    padding: 0 1.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
