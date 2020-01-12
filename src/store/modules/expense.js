import { API } from 'aws-amplify';
import config from '../../config';
import { s3Upload, s3FileUrl } from '../../libs/awsLib';
import endpoints from '../../api/endpoints';

import {
  CREATE_EXPENSE,
  DELETE_EXPENSE,
  GET_EXPENSES,
  FETCH_RECEIPT_URL,
  LIST_EXPENSES,
  REMOVE_EXPENSE,
  SET_EXPENSES,
  SET_RECEIPT_URL,
  GET_RECEIPT_URL,
} from './expense-types';

export const actions = {
  [LIST_EXPENSES]: async ({ commit }, { periodId }) => {
    try {
      const expenses = await API.get(config.API_NAME, endpoints.listExpenses(periodId));
      commit(SET_EXPENSES, expenses);
      return expenses;
    } catch (error) {
      commit('notification/NOTIFICATION_ERROR', error.message, { root: true });
      return null;
    }
  },
  [CREATE_EXPENSE]: async ({ commit }, {
    amount,
    fkPeriod,
    title,
    fkTransactionType,
    fkCategory,
    receipt,
  }) => {
    try {
      let receiptFileKey = null;
      if (receipt) {
        receiptFileKey = await s3Upload(receipt);
      }
      return await API.post(config.API_NAME, endpoints.createExpense, {
        body: {
          amount,
          fkPeriod,
          title,
          fkTransactionType,
          fkCategory,
          receipt: receiptFileKey,
        },
      });
    } catch (error) {
      commit('notification/NOTIFICATION_ERROR', error.message, { root: true });
      return null;
    }
  },
  [DELETE_EXPENSE]: async ({ commit }, { idExpense }) => {
    try {
      const deletedExpense = await API.del(config.API_NAME, endpoints.deleteExpense(idExpense));
      commit(REMOVE_EXPENSE, idExpense);
      return deletedExpense;
    } catch (error) {
      commit('notification/NOTIFICATION_ERROR', error.message, { root: true });
      return null;
    }
  },
  [FETCH_RECEIPT_URL]: async ({ commit }, { fileKey, idExpense }) => {
    try {
      const receiptUrl = await s3FileUrl(fileKey);
      commit(SET_RECEIPT_URL, { receiptUrl, idExpense });
      return receiptUrl;
    } catch (error) {
      commit('notification/NOTIFICATION_ERROR', error.message, { root: true });
      return null;
    }
  },
};

export const mutations = {
  [SET_EXPENSES]: (state, expenses) => {
    state.expenses = expenses;
  },
  [SET_RECEIPT_URL]: (state, { receiptUrl, idExpense }) => {
    state.receiptUrls[idExpense] = receiptUrl;
  },
  [REMOVE_EXPENSE]: (state, idExpense) => {
    const expenseIndex = state.expenses.findIndex(exp => exp.idexpense === idExpense);
    state.expenses.splice(expenseIndex, 1);
  },
};
export const getters = {
  [GET_EXPENSES]: state => state.expenses,
  [GET_RECEIPT_URL]: state => idExpense => state.receiptUrl[idExpense],
};

export const state = () => ({
  expenses: [],
  receiptUrls: {},
});

export const namespaced = true;
