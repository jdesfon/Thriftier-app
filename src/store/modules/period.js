import { API } from 'aws-amplify';
import config from '../../config';
import endpoints from '../../api/endpoints';

import {
  CREATE_PERIOD,
  LIST_PERIODS,
  SET_PERIODS,
  GET_PERIODS,
} from './period-types';

export const actions = {
  [CREATE_PERIOD]: async ({ commit }, {
    title,
    budget,
    startDate,
    endDate,
  }) => {
    try {
      await API.post(config.API_NAME, endpoints.createPeriod, {
        body: {
          title, budget, startDate, endDate,
        },
      });
    } catch (error) {
      commit('notification/NOTIFICATION_ERROR', error.message, { root: true });
    }
  },
  [LIST_PERIODS]: async ({ commit }) => {
    try {
      const periods = await API.get(config.API_NAME, endpoints.listPeriods);
      commit(SET_PERIODS, periods);
    } catch (error) {
      commit('notification/NOTIFICATION_ERROR', error.message, { root: true });
    }
  },
};

export const mutations = {
  [SET_PERIODS]: (state, periods) => {
    state.periods = periods;
  },
};

export const getters = {
  [GET_PERIODS]: state => state.periods,
};

export const state = () => ({
  periods: [],
});

export const namespaced = true;
