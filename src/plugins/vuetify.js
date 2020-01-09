import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    red: '#D50000',
    orange: '#FF6D00',
    green: '#00C853',
    blue: '#00B8D4',
    dark: '#424242',
    grey: '#E0E0E0',
    greyDark: '#BDBDBD',
    white: '#FFFFFF',
    themes: {
      isLight: true,
      light: {
        background: '#FAFAFA',
      },
      dark: {
        background: '#424242',
      },
    },
  },
});
