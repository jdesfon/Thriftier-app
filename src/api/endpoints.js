export default {
  createPeriod: '/periods',
  fetchPeriod: id => `/periods/id/${id}`,
  listPeriods: isOpen => `/periods/list/open/${isOpen}`,
  listExpenses: idPeriod => `/expenses/period/${idPeriod}`,
  createExpense: '/expenses',
  listTransactionTypes: '/transaction-types',
};
