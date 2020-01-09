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
  SET_EXPENSES,
  SET_RECEIPT_URL,
  GET_RECEIPT_URL,
} from './expense-types';

export const actions = {
  [LIST_EXPENSES]: async ({ commit }, { periodId }) => {
    try {
      const expenses = await API.get(config.API_NAME, endpoints.listExpenses(periodId));
      commit(SET_EXPENSES, expenses);
    } catch (error) {
      commit('notification/NOTIFICATION_ERROR', error.message, { root: true });
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
      const receiptFileKey = await s3Upload(receipt);
      await API.post(config.API_NAME, endpoints.createExpense, {
        body: {
          amount,
          fkPeriod,
          title,
          fkTransactionType,
          fkCategory,
          receipt: receiptFileKey,
        },
      });
      commit('notification/NOTIFICATION_INFO', 'expense created', { root: true });
    } catch (error) {
      commit('notification/NOTIFICATION_ERROR', error.message, { root: true });
    }
  },
  [DELETE_EXPENSE]: async ({ commit }, { idExpense }) => {
    try {
      await API.del(config.API_NAME, endpoints.deleteExpense(idExpense));
    } catch (error) {
      commit('notification/NOTIFICATION_ERROR', error.message, { root: true });
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
