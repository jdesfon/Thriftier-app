import { API } from 'aws-amplify';
import config from '../../config';
import endpoints from '../../api/endpoints';

import {
  LIST_TRANSACTION_TYPES,
  SET_TRANSACTION_TYPES,
  GET_TRANSACTION_TYPES,
} from './transactionType-types';

export const actions = {
  [LIST_TRANSACTION_TYPES]: async ({ commit }) => {
    try {
      const transactionTypes = await API.get(config.API_NAME, endpoints.listTransactionTypes);
      commit(SET_TRANSACTION_TYPES, transactionTypes);
    } catch (error) {
      commit('notification/ERROR', error.message, { root: true });
    }
  },
};
export const mutations = {
  [SET_TRANSACTION_TYPES]: (state, transactionTypes) => {
    state.transactionTypes = transactionTypes;
  },
};
export const getters = {
  [GET_TRANSACTION_TYPES]: state => state.transactionTypes,
};

export const state = () => ({
  transactionTypes: [],
});

export const namespaced = true;
