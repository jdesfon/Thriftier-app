export default {
  createPeriod: '/periods',
  listPeriods: '/periods/list',
};

/**
endpoints:
  GET - https://gih3j9ocgk.execute-api.eu-west-1.amazonaws.com/prod/transaction-types
  POST - https://gih3j9ocgk.execute-api.eu-west-1.amazonaws.com/prod/periods
  GET - https://gih3j9ocgk.execute-api.eu-west-1.amazonaws.com/prod/periods/list
  GET - https://gih3j9ocgk.execute-api.eu-west-1.amazonaws.com/prod/periods/id/{id}
  PUT - https://gih3j9ocgk.execute-api.eu-west-1.amazonaws.com/prod/periods/edit/id/{id}
  PUT - https://gih3j9ocgk.execute-api.eu-west-1.amazonaws.com/prod/periods/close/id/{id}
  POST - https://gih3j9ocgk.execute-api.eu-west-1.amazonaws.com/prod/expenses
  GET - https://gih3j9ocgk.execute-api.eu-west-1.amazonaws.com/prod/expenses/period/{id}
  GET - https://gih3j9ocgk.execute-api.eu-west-1.amazonaws.com/prod/expenses/id/{id}
  PUT - https://gih3j9ocgk.execute-api.eu-west-1.amazonaws.com/prod/expenses/id/{id}
  DELETE - https://gih3j9ocgk.execute-api.eu-west-1.amazonaws.com/prod/expenses/id/{id}
functions:
  listTransactionTypes: thriftier-sls-api-prod-listTransactionTypes
  createPeriod: thriftier-sls-api-prod-createPeriod
  listPeriods: thriftier-sls-api-prod-listPeriods
  getPeriod: thriftier-sls-api-prod-getPeriod
  updatePeriod: thriftier-sls-api-prod-updatePeriod
  closePeriod: thriftier-sls-api-prod-closePeriod
  createExpense: thriftier-sls-api-prod-createExpense
  listExpenses: thriftier-sls-api-prod-listExpenses
  getExpense: thriftier-sls-api-prod-getExpense
  updateExpense: thriftier-sls-api-prod-updateExpense
  removeExpense: thriftier-sls-api-prod-removeExpense
* */
