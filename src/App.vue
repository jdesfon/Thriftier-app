<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-content>
      <transition name="slide-fade">
        <router-view />
      </transition>
    </v-content>
    <v-snackbar
      v-model="isSnackbarVisible"
      top
      vertical
      :color="color"
      :timeout="timeout"
    >
      {{ text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import {
  NOTIFICATION,
  UPDATE_SNACKBAR,
  GET_SNACKBAR,
  GET_SNACKBAR_MESSAGE,
  GET_SNACKBAR_TYPE,
  GET_SNACKBAR_TIMEOUT,
} from '@/store/modules/notification-types';

export default {
  name: 'App',
  computed: {
    theme() {
      return (this.$vuetify.theme.themes.isLight) ? 'light' : 'dark';
    },
    ...mapGetters(NOTIFICATION, {
      snackbar: GET_SNACKBAR,
      text: GET_SNACKBAR_MESSAGE,
      color: GET_SNACKBAR_TYPE,
      timeout: GET_SNACKBAR_TIMEOUT,
    }),
    isSnackbarVisible: {
      get() {
        return this.snackbar;
      },
      set() {
        this.updateSnackbar(false);
      },
    },
  },
  methods: {
    ...mapMutations(NOTIFICATION, {
      updateSnackbar: UPDATE_SNACKBAR,
    }),
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all .3s ease-in-out;
}
.slide-fade-enter, .slide-fade-leave-to {
transform: translateX(10px);
opacity: 0;
}
</style>
