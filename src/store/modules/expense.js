import { API } from 'aws-amplify';
import config from '../../config';
import s3Upload from '../../libs/awsLib';
import endpoints from '../../api/endpoints';

import {
  CREATE_EXPENSE,
  GET_EXPENSES,
  LIST_EXPENSES,
  SET_EXPENSES,
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
};

export const mutations = {
  [SET_EXPENSES]: (state, expenses) => {
    state.expenses = expenses;
  },
};
export const getters = {
  [GET_EXPENSES]: state => state.expenses,
};

export const state = () => ({
  expenses: [],
});

export const namespaced = true;
