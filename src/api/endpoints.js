export default {
  closePeriod: id => `/periods/close/id/${id}`,
  createPeriod: '/periods',
  deletePeriod: id => `/periods/id/${id}`,
  fetchPeriod: id => `/periods/id/${id}`,
  listPeriods: isOpen => `/periods/list/open/${isOpen}`,
  listExpenses: idPeriod => `/expenses/period/${idPeriod}`,
  createExpense: '/expenses',
  listTransactionTypes: '/transaction-types',
  listCategories: '/categories',
};
