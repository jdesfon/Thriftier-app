import { API } from 'aws-amplify';
import config from '../../config';
import endpoints from '../../api/endpoints';

import {
  LIST_CATEGORIES,
  SET_CATEGORIES,
  GET_CATEGORIES,
} from './category-types';

export const actions = {
  [LIST_CATEGORIES]: async ({ commit }) => {
    try {
      const categories = await API.get(config.API_NAME, endpoints.listCategories);
      commit(SET_CATEGORIES, categories);
    } catch (error) {
      commit('notification/ERROR', error.message, { root: true });
    }
  },
};
export const mutations = {
  [SET_CATEGORIES]: (state, categories) => {
    state.categories = categories;
  },
};
export const getters = {
  [GET_CATEGORIES]: state => state.categories,
};

export const state = () => ({
  categories: [],
});

export const namespaced = true;
