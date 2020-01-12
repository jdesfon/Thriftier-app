import { Auth } from 'aws-amplify';

import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  CONFIRM_EMAIL,
  SET_AUTHENTICATE_STATUS,
  SET_USER,
} from './user-types';

export const actions = {
  [SIGN_IN]: async ({ commit }, { email, password }) => {
    try {
      await Auth.signIn(email, password);
      return commit(SET_AUTHENTICATE_STATUS, true);
    } catch (error) {
      commit(SET_AUTHENTICATE_STATUS, false);
      return error;
    }
  },
  [SIGN_UP]: async ({ commit }, { email, password }) => {
    try {
      await Auth.signUp(email, password);
      return commit(SET_USER, {
        email,
        password,
      });
    } catch (error) {
      return error;
    }
  },
  [SIGN_OUT]: async ({ commit }) => {
    try {
      await Auth.signOut();
      commit(SET_AUTHENTICATE_STATUS, false);
      return commit(SET_USER, {
        email: null,
        password: null,
      });
    } catch (error) {
      return error;
    }
  },
  [CONFIRM_EMAIL]: async ({ commit, state }, { code }) => {
    try {
      await Auth.confirmSignUp(state.user.email, code);
      await Auth.signIn(state.user.email, state.user.password);
      return commit(SET_AUTHENTICATE_STATUS, true);
    } catch (error) {
      commit(SET_AUTHENTICATE_STATUS, false);
      return error;
    }
  },
};

export const mutations = {
  [SET_AUTHENTICATE_STATUS]: (state, status) => {
    state.isAuthenticated = status;
  },
  [SET_USER]: (state, { email, password }) => {
    state.user = {
      email,
      password,
    };
  },
};

export const getters = {};

export const state = () => ({
  isAuthenticated: true,
  user: {
    email: null,
    password: null,
  },
});

export const namespaced = true;
