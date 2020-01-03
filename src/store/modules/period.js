import { API } from 'aws-amplify';
import config from '../../config';
import endpoints from '../../api/endpoints';

import {
  CREATE_PERIOD,
  LIST_PERIODS,
  SET_PERIODS,
  GET_CLOSE_PERIODS,
  GET_OPEN_PERIODS,
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
  [LIST_PERIODS]: async ({ commit }, isOpen) => {
    try {
      const periods = await API.get(config.API_NAME, endpoints.listPeriods(isOpen));
      commit(SET_PERIODS, { periods, isOpen });
    } catch (error) {
      commit('notification/NOTIFICATION_ERROR', error.message, { root: true });
    }
  },
};

export const mutations = {
  [SET_PERIODS]: (state, { periods, isOpen }) => {
    if (isOpen === 1) {
      state.openPeriods = periods;
    } else {
      state.closePeriods = periods;
    }
  },
};

export const getters = {
  [GET_OPEN_PERIODS]: state => state.openPeriods,
  [GET_CLOSE_PERIODS]: state => state.closePeriods,
};

export const state = () => ({
  openPeriods: [],
  closePeriods: [],
});

export const namespaced = true;
