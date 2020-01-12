import { Auth } from 'aws-amplify';

import router from '../../router/index';

import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  CONFIRM_EMAIL,
  SET_AUTHENTICATE_STATUS,
  SET_USER,
} from './user-types';

export const actions = {
  [SIGN_IN]: ({ commit }, { email, password }) => Auth.signIn(email, password).then(() => {
    commit(SET_AUTHENTICATE_STATUS, true);
    return router.push({ name: 'home' });
  }).catch(() => {
    commit(SET_AUTHENTICATE_STATUS, false);
  }),
  [SIGN_UP]: ({ commit }, { email, password }) => Auth.signUp(email, password).then(() => {
    commit(SET_USER, { email, password });
    return router.push({ name: 'confirm' });
  }),
  [SIGN_OUT]: ({ commit }) => Auth.signOut().then(() => {
    commit(SET_AUTHENTICATE_STATUS, false);
    commit(SET_USER, { email: null, password: null });
    return router.push({ name: 'landing' });
  }),
  [CONFIRM_EMAIL]: ({ commit, state }, { code }) => Promise.all([
    Auth.confirmSignUp(state.user.email, code),
    Auth.signIn(state.user.email, state.user.password),
  ])
    .then(() => {
      commit(SET_AUTHENTICATE_STATUS, true);
      return router.push({ name: 'home' });
    }).catch(() => {
      commit(SET_AUTHENTICATE_STATUS, false);
    }),
};

export const mutations = {
  [SET_AUTHENTICATE_STATUS]: (state, status) => {
    state.isAuthenticated = status;
  },
  [SET_USER]: (state, { email, password }) => {
    state.user = { email, password };
  },
};

export const getters = {
};

export const state = () => ({
  isAuthenticated: true,
  user: {
    email: null,
    password: null,
  },
});

export const namespaced = true;
